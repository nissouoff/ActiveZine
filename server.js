const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const cors = require('cors');
const path = require('path');

// Initialiser Firebase Admin SDK
const serviceAccount = require('./ab.json'); // Chemin vers votre fichier de service Firebase
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://infofoot-32892-default-rtdb.firebaseio.com/",
});

const db = admin.firestore(); // Pour ajouter des données utilisateur dans Firestore
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Route pour servir la page principale
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Mettez ici le bon chemin vers votre index.html
});

// Route pour servir le dossier V1
app.use('/V1', express.static(path.join(__dirname, 'V1')));

// Route pour l'inscription
app.post('/register', async (req, res) => {
    const { username, name, email, password } = req.body;

    // Validation des données
    if (!username || !name || !email || !password) {
        return res.status(400).json({ message: "Tous les champs sont requis." });
    }

    try {
        // Créer un utilisateur avec Firebase Authentication
        const user = await admin.auth().createUser({
            email,
            password,
            displayName: username,
        });

        // Ajouter les informations utilisateur dans Firestore
        await db.collection('users').doc(user.uid).set({
            username,
            name,
            email,
            status: "non confirm", // Statut initial
            createdAt: new Date(),
        });

        res.status(201).json({ message: "Utilisateur créé avec succès !" });
    } catch (err) {
        console.error(err);

        // Gérer les erreurs
        res.status(500).json({ message: "Erreur lors de l'inscription.", error: err.message });
    }
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
});
