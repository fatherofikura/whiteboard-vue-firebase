// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

var sanitizer = require('sanitizer');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

// Saves a message to the Firebase Realtime Database but sanitizes the text by removing swearwords.
exports.addMessage = functions.https.onCall((data, context) => {
    // Message text passed from the client.
    const text = data.text;

    // Authentication / user information is automatically added to the request.
    const uid = context.auth.uid;
    const name = context.auth.token.name || null;
    const picture = context.auth.token.picture || null;
    const email = context.auth.token.email || null;

    // Saving the new message to the Realtime Database.
    const sanitizedMessage = sanitizer.sanitize(text); // Sanitize the message.
    return admin.database().ref('/messages').push({
        text: sanitizedMessage,
        author: { uid, name, picture, email },
    }).then(() => {
        console.log('New Message written');
        // Returning the sanitized message to the client.
        return { text: sanitizedMessage };
    })
});
