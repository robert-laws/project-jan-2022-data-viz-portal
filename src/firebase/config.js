import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyA-UL7mpw4owqoMS5kop7wh96Q62Gkrgn8',
  authDomain: 'data-viz-portal.firebaseapp.com',
  projectId: 'data-viz-portal',
  storageBucket: 'data-viz-portal.appspot.com',
  messagingSenderId: '1071279949163',
  appId: '1:1071279949163:web:c8fc51b21cf82251eaf82e',
};

// initialize firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
