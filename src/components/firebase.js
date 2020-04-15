import firebase from 'firebase'
import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'

const config = {
    apiKey: "AIzaSyBwKXh8edI4I06KfvK42BBWxN__Wq4CWe0",
    authDomain: "fir-auth-demo-7a8cd.firebaseapp.com",
    databaseURL: "https://fir-auth-demo-7a8cd.firebaseio.com",
    projectId: "fir-auth-demo-7a8cd",
    storageBucket: "fir-auth-demo-7a8cd.appspot.com",
    messagingSenderId: "535011672051",
    appId: "1:535011672051:web:371da6995530faf68f9c86",
    measurementId: "G-46L85J54Y5"
}


class Firebase {
    constructor() {
        // Initialize Firebase
        app.initializeApp(config);
        // app.analytics();
        this.auth = app.auth()
        this.db = app.firestore()
    }

    login(email, password) {
        return this.auth.signInWithEmailAndPassword(email, password)
    }

    logout() {
        return this.auth.signOut()
    }

    async register(name, email, password){
        await this.auth.createUserWithEmailAndPassword(email, password)
        return this.auth.currentUser.updateProfile({
            displayName: name
        })
    }

    addQuote(quote) {
        if(!this.auth.currentUser){
            return alert("Not authorized!")
        }
        
        return this.db.doc(`users_codedamn_video/${this.auth.currentUser.uid}`).set({
            quote
        })
    }

    isInitialized() {
        return new Promise(resolve => {
            this.auth.onAuthStateChanged(resolve)
        })
    }

    getCurrentUsername() { 
        return this.auth.currentUser && this.auth.currentUser.displayName
    }

    async getCurrentUserQuote() {
        const quote = await this.db.doc(`users_codedamn_video/${this.auth.currentUser.uid}`).get()

        return quote.get('quote')
    }
}

export default new Firebase()