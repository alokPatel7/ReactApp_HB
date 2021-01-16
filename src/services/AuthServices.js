import React, {Component, createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SignUp = async (email, password) => {
  return await auth().createUserWithEmailAndPassword(email, password);
};

export const LoginUser = async (email, password) => {
  return await auth().signInWithEmailAndPassword(email, password);
};

export const userSignOut = async () => {
  return await auth().signOut();
};

export const AuthErrorMessage = (errCode) => {
  console.log('this is message', errCode);
  switch (errCode) {
    case 'wrong-password':
      return 'Invalid Password';
    case 'invalid-email':
      return 'Invalid Email id';
    default:
      return 'Login Failed, Please Try again...';
  }
};
