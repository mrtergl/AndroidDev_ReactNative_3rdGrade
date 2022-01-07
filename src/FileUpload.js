import { Platform,Alert, useEffect } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
import firebaseSetup from './setup'
 export async function Upload(adsoyad,numara,basvuruTur,dosyaAd) {
   
    try {
        const file = await DocumentPicker.pickSingle({
          type: [DocumentPicker.types.pdf],
        });
        
        const path = await yol(file.uri);
        const result = await RNFetchBlob.fs.readFile(path,'base64');
        uploadFiletoFirebaseStorage(result,file,adsoyad,numara,basvuruTur,dosyaAd);
      } catch (err) {
       if (DocumentPicker.isCancel(err)) {
          // User cancelled the picker, exit any dialogs or menus and move on
        } else {
         throw err
        }
     }
   }
  function uploadFiletoFirebaseStorage(result,file,adsoyad,numara,basvuruTur,dosyaAd){
      const {storage,database} = firebaseSetup()
      const uploadTask = storage()
      .ref(`PDF/${file.name}`)
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
        saveFileToRealtimeDatabase(downloadURL, file,adsoyad,numara,basvuruTur,dosyaAd)
        console.log('File available at', downloadURL);
      });
    }
  ); 
}

  function saveFileToRealtimeDatabase(downloadURL,file,adsoyad,numara,basvuruTur,dosyaAd){
    console.log(adsoyad);
    const {storage,database} = firebaseSetup();
    const uniqueKey = database().ref().push().key;
    database().ref(`PDF/${uniqueKey}`).update({
      fileName: numara+'_'+adsoyad+'_'+dosyaAd,
      fileType: file.type,
      fileURL: downloadURL,
      basvuruTuru: basvuruTur,
      ogrno: numara
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
