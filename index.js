import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
//import firebase from 'firebase';

/**try {
    firebase.initializeApp({
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_AUTH_DOMAIN",
      databaseURL: "YOUR_DATABASE_URL",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_STORAGE_BUCKET",
      messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
      appId: "YOUR_APP_ID",
    });  
} catch (err) {
    console.log(err);
}**/
AppRegistry.registerComponent(appName, () => App);
