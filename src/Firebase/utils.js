import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/firebase-auth';
import {firebaseConfig} from './config';

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
GoogleProvider.setCustomParameters({prompt: 'select_account'});

export const handleUserProfile = async ({userAuth, additionalData}) => {
    if (!userAuth) return ;
    const { uid } = userAuth;

    const userRef = firestore.doc(`users/${uid}`);
    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const {displayName, email} = userAuth;
        const timestamp = new Date();
        const userRoles = ['user'];

        try {
            await userRef.set({
                displayName,
                email,
                createdDate: timestamp,
                userRoles,
                ...additionalData
            })
        }
        catch(err) {
            console.log(err);
        }
    }

    return userRef;
}

export const handleUserRegistration = async (userAuth, additionalData) => {
    if (!userAuth) return;
    const {uid} = userAuth;

    const registrationRef = firestore.doc(`registration/${uid}`);
    const snapShot = await registrationRef.get();

    if (!snapShot.exists) {
        const {email, firstName, lastName, password} = userAuth;
        const timestamp = new Date();

        try {
            await registrationRef.set({
                email,
                firstName,
                lastName,
                password,
                createdDate: timestamp,
                ...additionalData
            })
        }
        catch(err) {
            console.log(err);
        }
    }

    return registrationRef;
}

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            resolve(userAuth);
        }, reject);
    })
}