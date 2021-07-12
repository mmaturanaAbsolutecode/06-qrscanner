import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Registro } from '../Models/registro.model';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  private qrData: Storage | null = null;


  guardados: Registro[] = [];

  constructor(
    private storage: Storage
  ) {
    this.init();
  }

  async init() {    
      const storage = await this.storage.create();
      this.qrData = storage;
    }


  guardarRegistro(format: string, text: string) {

    const nuevoRegistro = new Registro(format, text);

    this.guardados.unshift(nuevoRegistro);
    console.log(this.guardados);
    this.qrData.set('registros', this.guardados);

  }

  leerDataStorage(){
    const datosStorage = this.storage.get('registros') ;
    return datosStorage;
  }

}
