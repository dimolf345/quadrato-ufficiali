// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  // firebase: {
  //   projectId: 'quadrato-ufficiali',
  //   appId: '1:758440980964:web:304b68f57e8a6e8e3697f1',
  //   storageBucket: 'quadrato-ufficiali.appspot.com',
  //   apiKey: 'AIzaSyD8VMHIU42W46OpVwtK2gWMYe3v8FvF3Yw',
  //   authDomain: 'quadrato-ufficiali.firebaseapp.com',
  //   messagingSenderId: '758440980964',
  //   measurementId: 'G-8TTE33HXZ5',
  // },
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyD8VMHIU42W46OpVwtK2gWMYe3v8FvF3Yw',
    authDomain: 'quadrato-ufficiali.firebaseapp.com',
    projectId: 'quadrato-ufficiali',
    storageBucket: 'quadrato-ufficiali.appspot.com',
    messagingSenderId: '758440980964',
    appId: '1:758440980964:web:304b68f57e8a6e8e3697f1',
    measurementId: 'G-8TTE33HXZ5',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
