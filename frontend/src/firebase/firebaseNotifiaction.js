import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyB2kgkhOZ8tVjUE3Wwi5B9NMBLOAaKkKQQ",
    authDomain: "chat-de838.firebaseapp.com",
    projectId: "chat-de838",
    storageBucket: "chat-de838.appspot.com",
    messagingSenderId: "918082947374",
    appId: "1:918082947374:web:1968dfb7ff3fe7bf5f52bf",
    measurementId: "G-0YMX394E81"
};

function requestPermission() {
  console.log("Requesting permission...");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");
      const app = initializeApp(firebaseConfig);
      console.log(app);

      const messaging = getMessaging(app);
      console.log(messaging);
      getToken(messaging, {
        vapidKey:
          "BCKNSY0FAgDlbgevvqBGsXdadLiRCrFR1wbWXqFYgQJOV3jX8nTSHAQzXcB91c6GGlmFwCfCcxCUK_UxDL7nTLA",
      }).then((currentToken) => {
        if (currentToken) {
          console.log("currentToken: ", currentToken);
        } else {
          console.log("Can not get token");
        }
      });
    } else {
      console.log("Do not have permission!");
    }
  });
}

requestPermission();