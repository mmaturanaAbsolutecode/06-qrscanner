import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Registro } from '../Models/registro.model';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  private qrData: Storage | null = null;


  guardados: Registro[] = [];

  constructor(
    private storage: Storage,
    private navCtrl: NavController,
    private iab: InAppBrowser

  ) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this.qrData = storage;
  }


  async guardarRegistro(format: string, text: string) {

    await this.leerDataStorage();

    const nuevoRegistro = new Registro(format, text);
    this.guardados.unshift(nuevoRegistro);

    console.log(this.guardados);
    this.qrData.set('registros', this.guardados);

    this.abrirRegistro(nuevoRegistro);
  }

  async leerDataStorage() {
    this.guardados = await this.storage.get('registros');
    return this.guardados;

  }

  abrirRegistro(registro: Registro) {

    this.navCtrl.navigateForward('/tabs/tab2');

    switch (registro.type) {

      case 'http':
        this.iab.create(registro.text, '_system');
        break;

      case 'geo':
        this.navCtrl.navigateForward(`/tabs/tab2/mapa/${registro.text}`);
        break;
    }



  }

}
