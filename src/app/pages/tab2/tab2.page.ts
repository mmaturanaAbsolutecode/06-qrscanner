import { Component } from '@angular/core';
import { Registro } from 'src/app/Models/registro.model';
import { DataLocalService } from 'src/app/services/data-local.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  guardadosData: Registro []=[];

  constructor(
    public dataLocalSrv: DataLocalService
  ) {   
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter Historial');
    this.init();
  }

  enviarCorreo(){
    console.log('Enviando correo...');

  }

  async init (){
    this.guardadosData= await this.dataLocalSrv.leerDataStorage();
    console.log('guardados',this.guardadosData);
  }

}
