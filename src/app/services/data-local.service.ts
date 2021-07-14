import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Registro } from '../Models/registro.model';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { File } from '@ionic-native/file/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  guardados: Registro[] = [];

  private qrData: Storage | null = null;



  constructor(
    private storage: Storage,
    private navCtrl: NavController,
    private iab: InAppBrowser,
    private file: File,
    private emailComposer: EmailComposer

  ) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this.qrData = storage;
    //this.guardados = await this.storage.get('registros') || [];
  }


  async guardarRegistro(format: string, text: string) {
    await this.leerDataStorage();
    const nuevoRegistro = new Registro(format, text);
    await this.guardados.unshift(nuevoRegistro);
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

  enviarCorreo() {
    const arrTemp = [];
    const titulos = 'Tipo, Formato, Creado en, Texto\n';

    arrTemp.push(titulos);

    this.guardados.forEach(registro => {
      const linea = `${registro.type},${registro.format},${registro.created},${registro.text.replace(',', ' ')}\n`;
      arrTemp.push(linea);
    });

    console.log(arrTemp.join(' '));

    this.crearArchivoFisico(arrTemp.join(' '));

  }

  crearArchivoFisico(text: string) {

    this.file.checkFile(this.file.dataDirectory, 'registros.csv')
      .then(existe => {
        console.log('Existe Archivo ', existe);
        return this.escribirEnArchivo(text);
      })
      .catch(err => {
        return this.file.createFile(this.file.dataDirectory, 'registros.csv', false)
          .then(creado => this.escribirEnArchivo(text))
          .catch(err2 => console.log('No se pudo Crear el archivo', err2));
      });

  }

  async escribirEnArchivo(text: string) {
    await this.file.writeExistingFile(this.file.dataDirectory, 'registros.csv', text);
    const archivo = `${this.file.dataDirectory}registros.csv`;
    //console.log(this.file.dataDirectory + 'registros.csv');

    const email = {
      to: 'matutosistem@gmail.com',
      cc: 'marcelo.maturana@absolutecode.cl',
      // bcc: ['john@doe.com', 'jane@doe.com'],
      attachments: [
        // 'file://img/logo.png',
        // 'res://icon.png',
        // 'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
        // 'file://README.pdf'
        archivo


      ],
      subject: 'Backups de scans',
      body: 'historial de scaneos - <strong>QrScanner</strong>',
      isHtml: true
    };

    // Send a text message using default options
    this.emailComposer.open(email);
  }

}
