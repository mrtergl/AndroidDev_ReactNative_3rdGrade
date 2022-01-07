import { Platform,Alert, useEffect } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
import firebaseSetup from './setup'
 export async function Upload() {
   
    try {
        const file = await DocumentPicker.pickSingle({
          type: [DocumentPicker.types.allFiles],
        });
        
        const path = await yol(file.uri);
        const result = await RNFetchBlob.fs.readFile(path,'base64');
        uploadFiletoFirebaseStorage(result,file);
      } catch (err) {
       if (DocumentPicker.isCancel(err)) {
          // User cancelled the picker, exit any dialogs or menus and move on
        } else {
         throw err
        }
     }
   }
  function uploadFiletoFirebaseStorage(){
      const {storage,database} = firebaseSetup()
      const uploadTask = storage()
      .ref(`Image/${file.name}`)
      .putString(result,'base64',{contentType:file.type});

      uploadTask.on('state_changed', 
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case storage.TaskState.PAUSED: 
          console.log('Upload is paused');

          break;
        case storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
      }
    }, 
    (error) => {
    }, 
    () => {
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        saveFileToRealtimeDatabase(downloadURL, file)
        console.log('File available at', downloadURL);
      });
    }
  ); 
}

  function saveFileToRealtimeDatabase(downloadURL,file){
    console.log(adsoyad);
    const {storage,database} = firebaseSetup();
    const uniqueKey = database().ref().push().key;
    database().ref(`Image/${uniqueKey}`).update({
      fileName: "file",
      fileType: file.type,
      fileURL: downloadURL,
    });
  }
  function yol(path){
     if(Platform.OS==='ios' || Platform.OS==='android'){
       const filePrefix = 'file://';
     if(path.startsWith(filePrefix)){
       path = path.substring(filePrefix.length);
       try{
         path=decodeURI(path);
       }
       catch(e){

       }
      }
    }
    return path;
  }
