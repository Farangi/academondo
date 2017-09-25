const functions = require('firebase-functions');

const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);



// // need to pay for blaze or flame at firebase
// const algoliasearch = require('algoliasearch');



// const client = algoliasearch(functions.config().algolia.app_id, functions.config().algolia.api_key);




// // Name fo the algolia index for Blog posts content.
// const ALGOLIA_INDEX_NAME = 'profiles';

// // Updates the search index when new blog entries are created or updated.
// exports.indexentry = functions.database.ref('/profiles/{profilesid}').onWrite(event => {
//     const index = client.initIndex(ALGOLIA_INDEX_NAME);
//     const firebaseObject = {
//         text: event.data.val(),
//         objectID: event.params.blogid
//     };

//     return index.saveObject(firebaseObject).then(
//         () => event.data.adminRef.parent.child('last_index_timestamp').set(
//             Date.parse(event.timestamp)));
// });

// // Starts a search query whenever a query is requested (by adding one to the `/search/queries`
// // element. Search results are then written under `/search/results`.
// exports.searchentry = functions.database.ref('/search/queries/{queryid}').onWrite(event => {
//     const index = client.initIndex(ALGOLIA_INDEX_NAME);

//     const query = event.data.val().query;
//     const key = event.data.key;

//     return index.search(query).then(content => {
//         const updates = {
//             '/search/last_query_timestamp': Date.parse(event.timestamp)
//         };
//         updates[`/search/results/${key}`] = content;
//         return admin.database().ref().update(updates);
//     });
// });





// youtube angular firebase algolia part 2

// const algolia = algoliasearch(functions.config().algolia.appid, functions.config().algolia.adminkey);


// exports.updateIndex = functions.database.ref('/profiles/{profileId}').onWrite(event => {
//     const index = algolia.initIndex('profiles');

//     const profileId = event.params.profileId;
//     const data = event.data.val();

//     if (!data) {
//         return index.deleteObject(profileId, (err) => {
//             if (err) throw err
//             console.log('profile removed from Algolia Index', profileId)
//         })
//     }


//     data['objectID'] = profileId;

//     return index.saveObject(data, (err, content) => {
//         if (err) throw err
//         console.log('profile updated in Algolia Index', data.objectID)
//     });
// });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
