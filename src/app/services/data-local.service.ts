import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Registro } from '../Models/registro.model';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
  private registro: Storage | null = null;


  guardados : Registro[]=[];

  constructor(
    private storage: Storage
  ) {
    this.init();
   }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this.registro = storage;
    console.log('storage creado');
  }


guardarRegistro(format:string, text:string){

  const nuevoRegistro = new Registro(format, text);

  this.guardados.unshift(nuevoRegistro);
  console.log(this.guardados);
  this.registro.set('registros',this.guardados);
  
}

}
