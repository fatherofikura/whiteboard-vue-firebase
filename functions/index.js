// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

var sanitizer = require('sanitizer');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

// Saves a message to the Firebase Realtime Database but sanitizes the text by removing swearwords.
exports.addMessage = functions.https.onCall( (data, context) => {
  // Message text passed from the client.
  const text = data.text;

  // Checking attribute.
  if (!(typeof text === 'string') || text.length === 0) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError('invalid-argument', 'The function must be called with ' +
      'one arguments "text" containing the message text to add.');
  }

  // Checking that the user is authenticated.
  if (!context.auth) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
      'while authenticated.');
  }

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
  }).catch((error) => {
    // Re-throwing the error as an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError('unknown', error.message, error);
  });
});

// ------------------------------------------
// メンバー情報追加用
// ------------------------------------------
exports.insertMember = functions.https.onCall( (data, context) => {
  const name = data.name;
  const phoneNumber = data.phoneNumber;
  const position = data.position;

  // Checking attribute.
  if (!(typeof name === 'string') || name.length === 0) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError('invalid-argument', 'The function must be called with ' +
      'one arguments "name" containing the name to add.');
  }

  // Checking that the user is authenticated.
  if (!context.auth) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
      'while authenticated.');
  }
  // A post entry.
  var postData = {
    name: name,
    phoneNumber: phoneNumber,
    position: position
  };

  // Get a key for a new Post.
  var newPostKey = admin.database().ref().child('member').push().key;
  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/member/' + newPostKey] = postData;
  return admin.database().ref().update(updates);
});

// ------------------------------------------
// メンバー情報参照用
// ------------------------------------------
exports.selectMember = functions.https.onCall( (data, context) => {
  // Checking that the user is authenticated.
  if (!context.auth) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
      'while authenticated.');
  }

  // Get a Member.
  return admin.database().ref('/member').once('value', (snapshot) => {
    console.log('value', snapshot.val())
  })
});
