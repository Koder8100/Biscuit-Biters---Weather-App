import {db, auth} from "./auth.js";
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

export async function saveLocationForUser(user, cityName) {
    const userDocRef = doc(db, "users", user.uid);
    await updateDoc(userDocRef, {
        savedLocations: arrayUnion(cityName)
    });
}

export async function getSavedLocationsForUser(user) {
    const userDocRef = doc(db, "users", user.uid);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        return userData.savedLocations || [];
    } else {
        return [];
    }
}

export async function removeLocationForUser(user, cityName) {
    const userDocRef = doc(db, "users", user.uid);
    await updateDoc(userDocRef, {
        savedLocations: arrayRemove(cityName)
    });
    
}