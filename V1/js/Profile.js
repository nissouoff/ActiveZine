const firebaseConfig = {
    apiKey: "AIzaSyAdo42qfCCYjwvdi5_JthsrDXxcRIxsbE0",
    authDomain: "infofoot-32892.firebaseapp.com",
    databaseURL: "https://infofoot-32892-default-rtdb.firebaseio.com",
    projectId: "infofoot-32892",
    storageBucket: "infofoot-32892.appspot.com",
    messagingSenderId: "439273116379",
    appId: "1:439273116379:web:9eb86071e411f748c772fe"
};

// Initialiser Firebase (éviter les réinitialisations multiples)
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// Initialiser les services Firebase
const auth = firebase.auth();
const database = firebase.database();

document.addEventListener("DOMContentLoaded", () => {
    const userProfile = document.getElementById("user-profile");

    // Vérifiez l'état d'authentification de l'utilisateur
    firebase.auth().onAuthStateChanged(async (user) => {
        if (!user) {
            alert("Veuillez vous connecter pour voir vos données.");
            window.location.href = "/login.html"; // Redirection vers la page de connexion
            return;
        }

        const uid = user.uid;

        try {
            // Récupérer les données depuis Firebase Database
            const snapshot = await database.ref(`Technique/${uid}`).once("value");
            const data = snapshot.val();

            if (!data) {
                userProfile.innerHTML = `<p>Aucune donnée trouvée pour cet utilisateur.</p>`;
                return;
            }

            // Construire l'affichage des données
            const { firstName, lastName, phone, birthDate, weight, height, nationalId, nationalCardPhoto } = data;

            userProfile.innerHTML = `
                <div><span>Nom :</span> ${lastName || "Non renseigné"}</div>
                <div><span>Prénom :</span> ${firstName || "Non renseigné"}</div>
                <div><span>Téléphone :</span> ${phone || "Non renseigné"}</div>
                <div><span>Date de Naissance :</span> ${birthDate || "Non renseigné"}</div>
                <div><span>Poids :</span> ${weight || "Non renseigné"} kg</div>
                <div><span>Taille :</span> ${height || "Non renseigné"} cm</div>
                <div><span>Numéro de Carte Nationale :</span> ${nationalId || "Non renseigné"}</div>
                <div class="profile-photo">
                <div class ="confirm">Demende en cour de traitment</div>
            `;
        } catch (error) {
            console.error("Erreur lors de la récupération des données :", error);
            userProfile.innerHTML = `<p>Une erreur s'est produite. Veuillez réessayer plus tard.</p>`;
        }
    });
});

document.getElementById("close-button").addEventListener("click", () => {
    document.querySelector(".user-data-container").style.display = "none";
});
