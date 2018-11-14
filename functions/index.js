const functions = require('firebase-functions');
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const admin = require('firebase-admin');


exports.sendNotifications = functions.firestore.document('meetUps/{meetups}').onCreate((event) => {

    // var meetUPWithId = event.data().meetUPWithId;
    // var userId = event.data().userId;
    console.log(event.data());
    console.log(event.data().meetUPWithId);
    console.log(event.data().userId);
    // functions.firestore.document('user').doc(meetUPWithId).get().then(res => {
    //     console.log('token');
    //     var gainedTOken = res.data().token; 
    //     console.log(gainedTOken);

    // })
    // const NOTIFICATION_SNAPSHOT = event.data();
    // const payload = {
    //   notification: {
    //     title: `New Message from muneeb`,
    //     body: NOTIFICATION_SNAPSHOT.val().message,
    //     icon: NOTIFICATION_SNAPSHOT.val().userProfileImg,
    //     click_action: `https://${functions.config().firebase.authDomain}`
    //   }
    // }
})