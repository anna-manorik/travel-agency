/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// import * as functions from "firebase-functions";
// import * as admin from "firebase-admin";

// admin.initializeApp();

// interface AdminRequest {
//   email: string;
// }

// export const setAdminRole = functions.https.onCall(
//   async (request: functions.https.CallableRequest<AdminRequest>, context) => {
//     const email = request.data.email;

//   if (!email) {
//     throw new functions.https.HttpsError("invalid-argument", "Email is required");
//   }

//   try {
//     const user = await admin.auth().getUserByEmail(email);

//     await admin.auth().setCustomUserClaims(user.uid, {
//       role: "admin",
//     });

//     return { message: `${email} is now an admin.` };
//   } catch (error) {
//     console.error("Error setting admin role:", error);
//     throw new functions.https.HttpsError("internal", "Unable to set admin role");
//   }
// });


// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
