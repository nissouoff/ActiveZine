
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



const box = document.querySelector(".box");
const box2 = document.querySelector(".box2");
const singUp = document.getElementById("singup");
const login = document.getElementById("login");
const cnx = document.getElementById("connxion");
const forget = document.getElementById("forget");
const email = document.getElementById("email");
const password = document.getElementById("password");
const username = document.getElementById("username");
const name = document.getElementById("name");
const error = document.getElementById("error");
const error2 = document.getElementById("error2");
const emaill = document.getElementById("emaill");
const passwordd = document.getElementById("passwordd");
const confirm_passwordd = document.getElementById("confirm-passwordd");
const cc = ["tit-inc", "tit"].map(id => document.getElementById(id));
const cccc = ["circle1", "circle2", "circle3"].map(ids => document.getElementById(ids));
const inc = document.getElementById("inc");
const msg = document.getElementById("overview");

 

singUp.addEventListener("click", () => { 
    box.style.display = "none";
    box2.style.display = "flex";

    error2.style.display = "none";

    cc.forEach(element => {
        element.classList.remove("floating-text-error");
    });

    box.classList.remove("floating-box-error");

    cccc.forEach(element => {
        element.classList.remove("floating-circle-error");
    });

    cnx.style.backgroundColor = "#3498DB";
});

login.addEventListener("click", () => { 
    box2.style.display = "none";
    box.style.display = "flex";
    error.style.display = "none";

    cc.forEach(element => {
        element.classList.remove("floating-text-error");
    });

    box2.classList.remove("floating-box-error");

    cccc.forEach(element => {
        element.classList.remove("floating-circle-error");
    });

    inc.style.backgroundColor = "#3498DB";

}); 

document.getElementById("inc").addEventListener("click", () => {
    const username = document.getElementById("username").value.trim();
    const name = document.getElementById("name").value.trim();
    const emaill = document.getElementById("emaill").value.trim();
    const passwordd = document.getElementById("passwordd").value.trim();
    const confirm_passwordd = document.getElementById("confirm-passwordd").value.trim();
    const error = document.getElementById("error");
    const overview = document.querySelector(".overview");

    error.style.display = "none";
    error.textContent = "";

    if (!username || !name || !emaill || !passwordd || !confirm_passwordd) {
        error.textContent = "Veuillez remplir tous les champs.";
        error.style.color = "red";
        error.style.display = "block";
        return;
    }

    if (passwordd !== confirm_passwordd) {
        error.textContent = "Les mots de passe ne correspondent pas.";
        error.style.color = "red";
        error.style.display = "block";
        return;
    }

    auth.createUserWithEmailAndPassword(emaill, passwordd)
        .then((userCredential) => {

            localStorage.setItem("email", emaill);
            localStorage.setItem("name", name);
            localStorage.setItem("username", username);
            box2.style.display = "none";
            const user = userCredential.user;
            
            return database.ref(`Users/${user.uid}`).set({
                name: name,
                username: username,
                email: emaill,
                ref: user.uid
            });
        })
        .then(() => {
            overview.innerHTML = `<p>Compte créé avec succès !</p>`;
            overview.classList.add("active");
            box.style.display = "flex";

            setTimeout(() => {
                overview.classList.remove("active");
            }, 2000);

            document.getElementById("username").value = "";
            document.getElementById("name").value = "";
            document.getElementById("emaill").value = "";
            document.getElementById("passwordd").value = "";
            document.getElementById("confirm-passwordd").value = "";
        })
        .catch((err) => {
 
            let message = "";
            switch (err.code) {
                case "auth/email-already-in-use":
                    message = "L'email est déjà utilisé.";
                    break;
                case "auth/invalid-email":
                    message = "Email invalide.";
                    break;
                case "auth/weak-password":
                    message = "Le mot de passe est trop faible.";
                    break;
                default:
                    message = "Erreur : " + err.message;
            }
            error.textContent = message;
            error.style.color = "red";
            error.style.display = "block";
            box2.style.display = "flex";

            
        });
});

document.getElementById("connxion").addEventListener("click", () => {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const error2 = document.getElementById("error2");

   
    error2.style.display = "none";
    error2.textContent = "";

    
    if (!email || !password) {
        error2.textContent = "Veuillez remplir tous les champs.";
        error2.style.color = "red";
        error2.style.display = "block";
        return;
    }

  
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            box.style.display = "none";
            
            console.log("Connexion réussie !");
            window.location.href = "/V1/main/ActiveZone.html"; 
        })
        .catch((err) => {
           
            let message = "";
            switch (err.code) {
                case "auth/user-not-found":
                    message = "Aucun utilisateur trouvé avec cet email.";
                    break;
                case "auth/wrong-password":
                    message = "Mot de passe incorrect.";
                    break;
                case "auth/invalid-email":
                    message = "Email invalide.";
                    break;
                default:
                    message = "Erreur : " + err.message;
            }
            error2.textContent = message;
            error2.style.color = "red";
            error2.style.display = "block";
            box.style.display = "flex";
        });
});
