import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';
import 'firebase/storage';
import { isPresent } from '../../../node_modules/ionic-angular/umd/util/util';
import 'firebase/firestore';
import 'firebase/auth';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public loading: LoadingController) {
    this.imagen = this.navParams.get('image')
    this.storage = firebase.storage();
    this.db = firebase.firestore();
    this.user = firebase.auth().currentUser;
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