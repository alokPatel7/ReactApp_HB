import React, {Component} from 'react';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';

export const setConnectionWithFirebase = async () => {
  return database().ref('users');
};

export const AddItem = async (params) => {
  console.log(params);
  return await firestore()
    .collection('users')
    .add({
      date: params.date.toISOString().slice(0, 10),
      description: params.itemdesc,
      price: params.price,
      expensesType: params.selectItem,
    });
};
