import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Subject } from 'rxjs';

@Injectable()
export class AuthService {
  currentUser;
  currentUserChange: Subject<any> = new Subject<any>();

  constructor (
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) {}

  getCurrentUser() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setAuth(user.email);
      } else {
        this.clearUserInfo();
      }
    });
  }

  clearUserInfo() {
    this.currentUser = null;
    this.currentUserChange.next(this.currentUser);
  }

  login(email, password) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then(res => {
        resolve(res);
      }, err => reject(err));
    });
  }

  googleLogin() {
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
      });
    });
  }

  emailRegister(email, password) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(res => resolve(res))
      .catch(err => reject(err));
    });
  }

  setAuth(email: any) {
    const userData: AngularFirestoreCollection = this.afs.collection('users', ref => ref.where('email', '==', email));
    userData.valueChanges().subscribe((res) => {
      this.currentUser = res[0];
      this.currentUserChange.next(this.currentUser);
    });
  }

  logout() {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        this.afAuth.auth.signOut();
        this.clearUserInfo();
        resolve();
      } else {
        this.getCurrentUser();
      }
    });
  }

  sendPasswordReset(email) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().sendPasswordResetEmail(email)
      .then(res => {
        // Email sent.
        resolve(res);
      }, err => {
        // An error happened.
        reject(err);
      });
    });
  }
}
