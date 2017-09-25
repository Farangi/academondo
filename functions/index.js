const functions = require('firebase-functions');

const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

const algoliasearch = require('algoliasearch');
const algolia = algoliasearch(functions.config().algolia.appid, functions.config().algolia.adminkey);


exports.updateIndex = functions.database.ref('/profiles/{profileId}').onWrite(event => {
    const index = algolia.initIndex('profiles');

    const profileId = event.params.profileId;
    const data = event.data.val();

    if (!data) {
        return index.deleteObject(profileId, (err) => {
            if (err) throw err
            console.log('profile removed from Algolia Index', profileId)
        })
    }


    data['objectID'] = profileId;

    return index.saveObject(data, (err, content) => {
        if (err) throw err
        console.log('profile updated in Algolia Index', data.objectID)
    });
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
