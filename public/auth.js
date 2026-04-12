import {initializeApp} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";

import {
        getAuth,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        signOut,
        onAuthStateChanged, 
        connectAuthEmulator, 
        updatePassword, 
        EmailAuthProvider, 
        reauthenticateWithCredential, 
        sendPasswordResetEmail,
        setPersistence,
        browserLocalPersistence
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

import { getFirestore, doc, setDoc, connectFirestoreEmulator } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

import { firebaseConfig } from "./firebaseConfig.js";


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
/*
// Connect to emulators if in development environment
if (window.location.hostname === "localhost") {
    connectAuthEmulator(auth, "http://localhost:9099");
    connectFirestoreEmulator(db, "localhost", 8080);
}
*/
export async function signUpUser(auth, email, password) {
    const createUserCredential = await createUserWithEmailAndPassword(auth, email, password);

    // creating a user document in firestore
    await setDoc(doc(db, "users", createUserCredential.user.uid), {
        email: email,
        displayName: email.split("@")[0], // default display name is the part before @
        createdAt: new Date()
    });
    return createUserCredential.user;
}

export async function signInUser(auth, email, password) {
    return await signInWithEmailAndPassword(auth, email, password);
}

export async function logoutUser() {
    await signOut(auth);
    window.location.href = "index.html";
}

export async function sendPasswordReset(auth, email) {
    return await sendPasswordResetEmail(auth, email);
}


export { auth, db, onAuthStateChanged, updatePassword, EmailAuthProvider, 
    reauthenticateWithCredential, setPersistence, browserLocalPersistence };
