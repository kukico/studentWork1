    // Import the functions you need from the SDKs you need
    import { initializeApp } from "firebase/app";
    import { getAnalytics } from "firebase/analytics";
    import {getDatabase, push, ref} from "firebase/database";
    import { getAuth, onAuthStateChanged } from "firebase/auth";
    import {Inhaler} from "./Inhaler.js";
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
        apiKey: "AIzaSyBy1dB-bUbRIQPsvMiO3nujknwP6ntdMes",
        authDomain: "asthmapp-121a8.firebaseapp.com",
        databaseURL: "https://asthmapp-121a8-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "asthmapp-121a8",
        storageBucket: "asthmapp-121a8.appspot.com",
        messagingSenderId: "583573518616",
        appId: "1:583573518616:web:921a17f44e5fca27b3066d",
        measurementId: "G-PLRLWFR1X7"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    const analytics = getAnalytics(app);

    const auth = getAuth();
    const currentUser = auth.currentUser;
    const currentUID = currentUser.uid;
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const currentUser = auth.currentUser;
            const currentUID = user.uid;
        }
        else{alert('Sorry, you are not signed in!')}
    })
    const currentUserDB = ref(database,'/users/'+currentUID)
    const inhalerDB = ref(database,'/users/'+currentUID+'/inhalers')

    Notification.requestPermission().then(permission => {
        if (permission === 'denied') {
            alert("You need to allow notifications to receive dosage reminders.")
        }
    })

var popupclose = document.getElementById("closeBtn");
    if (popupclose) {
        popupclose.addEventListener("click", function (e) {
            var popup = e.currentTarget.parentNode;
            function isOverlay(node) {
                return !!(
                    node &&
                    node.classList &&
                    node.classList.contains("popup-overlay")
                );
            }
            while (popup && !isOverlay(popup)) {
                popup = popup.parentNode;
            }
            if (isOverlay(popup)) {
                popup.style.display = "none";
            }
        });
    }

    var popupbuttonPrimary = document.getElementById("applyBtn");
    if (popupbuttonPrimary) {
        popupbuttonPrimary.addEventListener("click", function (e) {
            var popup = e.currentTarget.parentNode;
            function isOverlay(node) {
                return !!(
                    node &&
                    node.classList &&
                    node.classList.contains("popup-overlay")
                );
            }
            while (popup && !isOverlay(popup)) {
                popup = popup.parentNode;
            }
            if (isOverlay(popup)) {
                popup.style.display = "none";
            }
        });
    }

    const addInhalerBtn = document.getElementById("applyBtn");
    const newInhalerCrisisBtn = document.getElementById("crisisInhalerBtn");
    const newInhalerPreventionBtn = document.getElementById("preventionBtn");

    const newInhalerName = document.getElementById("newInhalerName");
    const newInhalerVol = document.getElementById("newInhalerVolume");
    const newInhalerExpDate = document.getElementById("newInhalerExpDate");
    let newInhalerType = "Type Unknown";
    let newInhaler = 0;

    newInhalerCrisisBtn.addEventListener('click', function () {
        let newInhalerType = "Crisis";
    })
    newInhalerPreventionBtn.addEventListener('click', function () {
        let newInhalerType = "Prevention";
    })

    const newInhalerDoseBtn = document.getElementById("addReminderBtn");
    const newInhalerDoseReminder = document.getElementById("newDose");
    let reminderCount = 0;
    let newInhalerDoses ={};

    newInhalerDoseBtn.addEventListener('click', function () {
        newInhaler.setDose(newInhalerDoseReminder);
        reminderCount ++;
        let newInhalerDose = newInhaler.getNewDose();
        newInhalerDoses.push(newInhalerDose);

        let reminderTime = newInhalerDose.getReminderTime();
        if (reminderTime - Date.now()>0) {
            setTimeout(() => {
                if (Notification.permission === 'granted') {
                    new Notification("Time to Use " + newInhalerName + "!", {
                        body: "Based on your dosage, it is recommended to use your inhaler now.",
                        icon: "./public/inhaler2@2x.png",
                        tag: "dose-notify"
                    })
                }
                else {alert('You need to allow notification to receive dosage reminders!')}
            }, (reminderTime - Date.now()))
            let reminderSection = document.getElementById("dosagePrescriptionSection")
            let newReminderAdded = document.createElement('h3')
            newReminderAdded.className = "inhaler-name"
            newReminderAdded.textContent = "Dosage " + reminderCount.toString() + reminderTime.toString()
            reminderSection.appendChild(newReminderAdded)
        }
        else{alert("Your dosage is in the past!")}
    })


    addInhalerBtn.addEventListener('click', function () {
        let newInhaler = new Inhaler(newInhalerName,newInhalerVol,newInhalerExpDate,newInhalerType);
        if (newInhaler.isExpired()){
            alert("Inhaler "+ newInhaler.getName() + " is expired!")
        }
        push(inhalerDB,{newInhaler}).then((snap) => {
            const inhalerKey = snap.key
        })
        const newIntakeInhalerKey = newIntakeInhaler.key;
        const dosageDB = ref(database,
            '/users/' + currentUID + '/inhalers/' + newIntakeInhalerKey + '/dosage')
        push(dosageDB, newInhalerDoses)
    })