import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Camera, CameraOptions} from '@ionic-native/camera';

import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';
import { FotoPage } from '../foto/foto';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  imagen = FotoPage;

  user:firebase.User;
  db: firebase.firestore.Firestore;

  items=[];

  constructor(public navCtrl: NavController, public camera: Camera) {
this.user = firebase.auth().currentUser;
this.db = firebase.firestore();

this.db.collection('imagenes').orderBy('timestamp', 'desc')
.onSnapshot(query => {
this.items = [];
query.forEach(imagen => {
  if (imagen.data().user == this.user.uid){
    this.items.push(imagen.data());
  }
});
});
  }

  getPicture(){
    console.log('tomar foto');
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options)
    .then(imagen => {
      console.log('imagen capturada');
      this.navCtrl.push(this.imagen,{image: 'data:image/jpeg;base64,' + imagen});
    },error => {
      console.log(JSON.stringify(error));
    }
  );
  }

}
