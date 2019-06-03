import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';
import 'firebase/storage';
import { isPresent } from '../../../node_modules/ionic-angular/umd/util/util';
import 'firebase/firestore';
import 'firebase/auth';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the FotoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-foto',
  templateUrl: 'foto.html',
})
export class FotoPage {
imagen;
storage: firebase.storage.Storage;
db: firebase.firestore.Firestore;
user: firebase.User;
tipo= '';
copa= '';
tronco= '';
latitud= 0;
longitud = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loading: LoadingController, private geolocation: Geolocation) {
    this.imagen = this.navParams.get('image')
    this.storage = firebase.storage();
    this.db = firebase.firestore();
    this.user = firebase.auth().currentUser;
    this.geolocation.getCurrentPosition().then((resp) => {
       resp.coords.latitude
       resp.coords.longitude
       this.latitud = resp.coords.latitude;
       this.longitud = resp.coords.longitude;
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad FotoPage');
  }
  subirImagen(){
    let loading = this.loading.create({
      content: "Subiendo imagen..."
    });
    loading.present();
    let imagen = {
      tipo: this.tipo, 
      copa: this.copa, 
      tronco: this.tronco, 
      latitud: this.latitud,
      longitud: this.longitud,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      url:'',
      user: this.user.uid
    };
    this.db.collection('imagenes').add(imagen)
    .then(ref => {
      let imagenNombre = ref.id;
      let uploadTask = this.storage.ref('imagenes/'+ imagenNombre + '.jpg').putString(this.imagen,'data_url');
    uploadTask.then(out =>{
      loading.dismiss();
      let url = out.downloadURL;
      ref.update({url: url});
      this.navCtrl.pop();
    })
    .catch(error => {
      console.log('error al subir la imagen');
    });
    })

}

}