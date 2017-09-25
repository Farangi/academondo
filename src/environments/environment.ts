// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
 production: false,
 firebase: {
   apiKey: "AIzaSyAzErjcnCM-YXslmx42N3rqFiEzX0P1e_g",
   authDomain: "science-4bddf.firebaseapp.com",
   databaseURL: "https://science-4bddf.firebaseio.com",
   projectId: "science-4bddf",
   storageBucket: "science-4bddf.appspot.com",
   messagingSenderId: "308887472795"
 },
 algolia: {
   appId: 'FERMD47OFA',
   apiKey: '5989ec39df7d54608e857b170a0cb7d2',
   indexName: 'getstarted_actors',
   urlSync: false

 }
};

