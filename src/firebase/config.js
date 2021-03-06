import { initializeApp } from 'firebase/app';

// RDL27 ACCOUNT
const firebaseConfig = {
  apiKey: 'AIzaSyA-UL7mpw4owqoMS5kop7wh96Q62Gkrgn8',
  authDomain: 'data-viz-portal.firebaseapp.com',
  projectId: 'data-viz-portal',
  storageBucket: 'data-viz-portal.appspot.com',
  messagingSenderId: '1071279949163',
  appId: '1:1071279949163:web:c8fc51b21cf82251eaf82e',
};

// ROBDLAWS ACCOUNT
// const firebaseConfig = {
//   apiKey: 'AIzaSyBVGjCXs_lQHzuapqh_-IgtoL7lGKoTRN8',
//   authDomain: 'the-data-viz-portal.firebaseapp.com',
//   projectId: 'the-data-viz-portal',
//   storageBucket: 'the-data-viz-portal.appspot.com',
//   messagingSenderId: '5055113023',
//   appId: '1:5055113023:web:eec12fa839da647173d58a',
// };

// initialize firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
