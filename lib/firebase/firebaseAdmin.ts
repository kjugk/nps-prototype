import * as firebaseAdmin from "firebase-admin";

// get this JSON from the Firebase board
// you can also store the values in environment variables

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      privateKey: process.env["PRIVATE_KEY"],
      clientEmail: process.env["CLIENT_EMAIL"],
      projectId: process.env["PROJECT_ID"],
    }),
    databaseURL: `https://${process.env["PROJECT_ID"]}.firebaseio.com`,
  });
}

const firestore = firebaseAdmin.firestore();
export { firebaseAdmin, firestore };
