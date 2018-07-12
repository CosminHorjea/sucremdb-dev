import firebase from 'firebase'
import 'firebase/firestore'
import firebaseConfig from './firebaseConfig'

const FirebaseApp = firebase.initializeApp(firebaseConfig)

export default FirebaseApp.firestore();