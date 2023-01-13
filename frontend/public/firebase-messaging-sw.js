importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
    apiKey: "AIzaSyB2kgkhOZ8tVjUE3Wwi5B9NMBLOAaKkKQQ",
    authDomain: "chat-de838.firebaseapp.com",
    projectId: "chat-de838",
    storageBucket: "chat-de838.appspot.com",
    messagingSenderId: "918082947374",
    appId: "1:918082947374:web:1968dfb7ff3fe7bf5f52bf",
    measurementId: "G-0YMX394E81"
  };

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});