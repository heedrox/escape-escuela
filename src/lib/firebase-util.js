import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'
import dbOptions from '../config/db-options';
import { getGameCode } from './get-game-code';

firebase.initializeApp(dbOptions);

const auth = firebase.auth();
const firestore = firebase.firestore();

const FIREBASE_URL = `/game-states/${getGameCode()}`;

const firebaseUtil = {
  login: () => auth.signInWithEmailAndPassword(dbOptions.customEscape.auth.email, dbOptions.customEscape.auth.password),
  doc: (path) => firestore.doc(`${FIREBASE_URL}${path}`)
};

export default firebaseUtil;
