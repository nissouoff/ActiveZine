
// Initialiser Firebase dans le service worker
importScripts('https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.1/firebase-messaging.js');

const firebaseConfig = {
  apiKey: "AIzaSyAdo42qfCCYjwvdi5_JthsrDXxcRIxsbE0",
  authDomain: "infofoot-32892.firebaseapp.com",
  projectId: "infofoot-32892",
  storageBucket: "infofoot-32892.appspot.com",
  messagingSenderId: "439273116379",
  appId: "1:439273116379:web:9eb86071e411f748c772fe"
};

firebase.initializeApp(firebaseConfig);

// Recevoir les notifications en arrière-plan
const messaging = firebase.messaging();

onBackgroundMessage(messaging, (payload) => {
    console.log("Message reçu en arrière-plan : ", payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.icon,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
