// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

var sanitizer = require('sanitizer');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

// ------------------------------------------
// メンバー情報追加用
// ------------------------------------------
exports.insertMember = functions.https.onCall( (data, context) => {
  const name = data.name;
  const phoneNumber = data.phoneNumber;
  const position = data.position;
  const group = data.group;
  const status = data.status;

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
    position: position,
    group:{
      [group] : true
    },
    status:{
      [status] : true
    }
  };

  // Get a key for a new Post.
  var newPostKey = admin.database().ref().child('member').push().key;
  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/member/' + newPostKey] = postData;
  return admin.database().ref().update(updates).then(snapshot => {
    return "";
  }).catch((error) => {
    // Re-throwing the error as an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError('unknown', error.message, error);
  });
});

// ------------------------------------------
// メンバー情報更新用
// ------------------------------------------
exports.updateMember = functions.https.onCall( (data, context) => {

  const uid = data.uid;
  const name = data.name;
  const phoneNumber = data.phoneNumber;
  const position = data.position;
  const group = data.group;
  const status = data.status;
  const note = data.note;

  // Checking attribute.
  if (!(typeof uid === 'string') || uid.length === 0) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError('invalid-argument', 'The function must be called with ' +
      'one arguments "uid" containing the uid to add.');
  }

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
    position: position,
    note : note,
    group:{
      [group] : true
    },
    status:{
      [status] : true
    },
  };

  // update
  var updates = {};
  updates['/member/' + uid] = postData;
  return admin.database().ref().update(updates).then(snapshot => {
    return "";
  }).catch((error) => {
    // Re-throwing the error as an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError('unknown', error.message, error);
  });
});

// ------------------------------------------
// メンバー情報削除用
// ------------------------------------------
exports.deleteMember = functions.https.onCall( (data, context) => {

  const uid = data.uid;

  // Checking attribute.
  if (!(typeof uid === 'string') || uid.length === 0) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError('invalid-argument', 'The function must be called with ' +
      'one arguments "uid" containing the uid to add.');
  }

  // Checking that the user is authenticated.
  if (!context.auth) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
      'while authenticated.');
  }

  // delete
  return admin.database().ref('/member/' + uid).remove().then(snapshot => {
    return "";
  }).catch((error) => {
    // Re-throwing the error as an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError('unknown', error.message, error);
  });
});

// ------------------------------------------
// ステータス更新用
// ------------------------------------------
exports.updateStatus = functions.https.onCall( (data, context) => {

  const uidList = data.selectedMember;
  const statusID = data.statusID;
  const note = data.note;

  // Checking attribute.
  if (!(uidList.length >= 0)){
    // Throwing an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError('invalid-argument', 'The function must be called with ' +
      'one arguments "uidList" containing the uidList to add.');
  }

    // Checking attribute.
    if (!(typeof statusID === 'string') || statusID.length === 0) {
      // Throwing an HttpsError so that the client gets the error details.
      throw new functions.https.HttpsError('invalid-argument', 'The function must be called with ' +
        'one arguments "statusID" containing the statusID to add.');
    }

  // Checking that the user is authenticated.
  if (!context.auth) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
      'while authenticated.');
  }


  // A post entry.
  var postMemberData = {
    [statusID] : true
  };
  var updates = {};
  for( var i=0; i<uidList.length; i++ ) {
    updates['/member/' + uidList[i] + '/status'] = postMemberData;
    updates['/member/' + uidList[i] + '/note'] = note;
  }

  console.log(updates);

  return admin.database().ref().update(updates).then(snapshot => {
    return "";
  }).catch((error) => {
    // Re-throwing the error as an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError('unknown', error.message, error);
  });
});

// ------------------------------------------
// ユーザ情報(Group)更新用
// ------------------------------------------
exports.updateUserWithGroup = functions.https.onCall( (data, context) => {

  const uid = data.uid;
  const group = data.group;

  // Checking attribute.
  if (!(typeof uid === 'string') || uid.length === 0) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError('invalid-argument', 'The function must be called with ' +
      'one arguments "uid" containing the uid to add.');
  }

    // Checking attribute.
    if (!(typeof group === 'string') || group.length === 0) {
      // Throwing an HttpsError so that the client gets the error details.
      throw new functions.https.HttpsError('invalid-argument', 'The function must be called with ' +
        'one arguments "group" containing the group to add.');
    }

  // Checking that the user is authenticated.
  if (!context.auth) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
      'while authenticated.');
  }

  // A post entry.
  var postData = {
    [group] : true
  };

  // update
  var updates = {};
  updates['/user/' + uid +'/group'] = postData;
  return admin.database().ref().update(updates).then(snapshot => {
    return "";
  }).catch((error) => {
    // Re-throwing the error as an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError('unknown', error.message, error);
  });
});

// ------------------------------------------
// ユーザ情報(SortedList)更新用
// ------------------------------------------
exports.updateUserWithSortedList = functions.https.onCall( (data, context) => {

  const uid = data.uid;
  const group = data.group;
  const sortedList = data.sortedList;

  // Checking attribute.
  if (!(typeof uid === 'string') || uid.length === 0) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError('invalid-argument', 'The function must be called with ' +
      'one arguments "uid" containing the uid to add.');
  }

  // Checking attribute.
  if (!(typeof sortedList === 'string') || sortedList.length === 0) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError('invalid-argument', 'The function must be called with ' +
      'one arguments "sortedList" containing the sortedList to add.');
  }

  // Checking that the user is authenticated.
  if (!context.auth) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
      'while authenticated.');
  }

  // A post entry.
  var postData = {
    list : sortedList
  };

  // update
  var updates = {};
  updates['/user/' + uid +'/sortedList/' + group ] = postData;
  return admin.database().ref().update(updates).then(snapshot => {
    return "";
  }).catch((error) => {
    // Re-throwing the error as an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError('unknown', error.message, error);
  });
});
