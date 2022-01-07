import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';

export const db = firebase.database();

export default () =>{
    return {firebase,database,storage};
};