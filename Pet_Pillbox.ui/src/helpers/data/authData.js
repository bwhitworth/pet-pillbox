import firebase from 'firebase';
import axios from 'axios';
import { baseUrl } from '../constants.json';

// interceptors work by changing the outbound request before the xhr is sent 
// or by changing the response before it's returned to our .then() method.
axios.interceptors.request.use(function (request) {
  const token = sessionStorage.getItem('token');

  if (token != null) {
    request.headers.Authorization = `Bearer ${token}`;
  }

  return request;
}, function (err) {
  return Promise.reject(err);
});

const checkForExistingUser = (user) => new Promise((resolve, reject) => {
  var existingUser = {};
  axios.get(`${baseUrl}/users/${user.firebaseUid}`)
    .then((response) => {
      existingUser.firebaseUid = response.data.firebaseUid;
      resolve(existingUser);
    })
    .catch((err) => {
      reject(err);
      axios.post(`${baseUrl}/users`, user);
    });
});

const loginUser = () => {
  //sub out whatever auth method firebase provides that you want to use.
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider).then(cred => {
    //get token from firebase
    let userInfo = { firebaseUid: cred.user.uid };

    cred.user.getIdToken()
      //save the token to the session storage
      .then(token => sessionStorage.setItem('token', token))
      .then(() => {
        checkForExistingUser(userInfo)
      })
  })
};

const logoutUser = () => {
  return firebase.auth().signOut();
};

const getUid = () => {
  return firebase.auth().currentUser.uid;
};

const getUserByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/users/${uid}`)
  .then((response) => {
    resolve(response.data);
  })
  .catch((err) => reject(err));
});

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  getUid,
  getUserByUid,
  loginUser,
  logoutUser,
};