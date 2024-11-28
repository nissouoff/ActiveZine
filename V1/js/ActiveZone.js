const firebaseConfig = {
    apiKey: "AIzaSyAdo42qfCCYjwvdi5_JthsrDXxcRIxsbE0",
    authDomain: "infofoot-32892.firebaseapp.com",
    databaseURL: "https://infofoot-32892-default-rtdb.firebaseio.com",
    projectId: "infofoot-32892",
    storageBucket: "infofoot-32892.appspot.com",
    messagingSenderId: "439273116379",
    appId: "1:439273116379:web:9eb86071e411f748c772fe"
};

// Initialiser Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();
const storage = firebase.storage();

document.addEventListener("DOMContentLoaded", () => {
    const confirmButton = document.getElementById("confirm-button");
    const form = document.getElementById("user-form");

    confirmButton.addEventListener("click", async () => {
        const firstName = document.getElementById("first-name").value.trim();
        const lastName = document.getElementById("last-name").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const birthDate = document.getElementById("birth-date").value.trim();
        const weight = document.getElementById("weight").value.trim();
        const height = document.getElementById("height").value.trim();
        const nationalId = document.getElementById("national-id").value.trim();
        const nationalCardPhoto = document.getElementById("national-card-photo").files[0];

        if (!nationalCardPhoto) {
            alert("Veuillez importer la photo de la carte nationale.");
            return;
        }

        // Vérifier si l'utilisateur est connecté et obtenir son UID
        const user = firebase.auth().currentUser;
        if (!user) {
            alert("Utilisateur non connecté.");
            return;
        }

        const uid = user.uid;

        try {
            // Télécharger la photo dans Firebase Storage
            const storageRef = storage.ref(`NationalCards/${uid}/${nationalCardPhoto.name}`);
            const uploadTask = await storageRef.put(nationalCardPhoto);
            const sport = localStorage.getItem("selectedSport");

            // Obtenir l'URL de téléchargement
            const photoURL = await uploadTask.ref.getDownloadURL();

            // Sauvegarder les données dans Firebase Database (ou Firestore)
            const data = {
                firstName,
                lastName,
                phone,
                birthDate,
                weight,
                height,
                nationalId,
                nationalCardPhoto: photoURL,
                sport,
            };

            const dbRef = database.ref(`Technique/${uid}`);
            await dbRef.set(data);

            alert("Les données ont été sauvegardées avec succès !");
            window.location.href = "/V1/main/ActiveZone2.html";
            form.reset(); // Réinitialiser le formulaire
        } catch (error) {
            console.error("Erreur lors de l'enregistrement :", error);
            alert("Une erreur est survenue. Veuillez réessayer.");
        }
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const gridItems = document.querySelectorAll(".grid-item");
    const actionButton = document.getElementById("action-button");
    const parti1 = ["sport", "tit", "cpa"].map(id => document.getElementById(id));
    const formu = document.querySelector(".formu");

    let selectedSport = null; // Variable pour stocker le sport sélectionné

    gridItems.forEach(item => {
        item.addEventListener("click", () => {
            // Retire la classe "selected" de tous les éléments
            gridItems.forEach(i => i.classList.remove("selected"));

            // Ajoute la classe "selected" à l'élément cliqué
            item.classList.add("selected");

            // Récupère le texte du sport depuis .text-overlay
            selectedSport = item.querySelector(".text-overlay").innerText;

            // Affiche le bouton
            actionButton.style.display = "block";
        });
    });

    // Sauvegarde dans le Local Storage au clic sur "Continuer"
    actionButton.addEventListener("click", () => {
        if (selectedSport) {
            localStorage.setItem("selectedSport", selectedSport);
            
            parti1.forEach(element => {
                element.style.display = "none";
            });

            formu.style.display = "block";
           
        } else {
          
        }
    });
});

