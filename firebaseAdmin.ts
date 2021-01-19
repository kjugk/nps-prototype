import * as firebaseAdmin from "firebase-admin";

// get this JSON from the Firebase board
// you can also store the values in environment variables
import serviceAccount from "./credentials/nps-prototype-firebase-adminsdk-edmju-2e489b33fb.json";

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      privateKey: serviceAccount.private_key,
      clientEmail: serviceAccount.client_email,
      projectId: serviceAccount.project_id,
    }),
    databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
  });
}

const firestore = firebaseAdmin.firestore();
export { firebaseAdmin, firestore };
