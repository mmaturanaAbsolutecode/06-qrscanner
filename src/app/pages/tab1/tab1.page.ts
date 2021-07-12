import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  slideOpts = {
    allowSlidePrev: false,
    allowSlideNext: false
  };

  constructor(
    private barcodeScanner: BarcodeScanner,
    private dataLocalSrv : DataLocalService
  ) { }

  // ionViewDidEnter() {
  //   console.log('ionViewDidEnter');
  // }

  // ionViewDidLeave() {
  //   console.log('viewDidleave');
  // }

  // ionViewDidLoad() {
  //   console.log(' ionViewDidLoad');
  // }
  // ionViewWillEnter() {
  //   console.log('ionViewWillEnter');
  //  // this.scan();
  // }

  // ionWillLeave() {
    
  // }sale de qui qlo

  scan() {

    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      if(!barcodeData.cancelled){
        this.dataLocalSrv.guardarRegistro(barcodeData.format, barcodeData.text);
      }
    }).catch(err => {
      console.log('Error', err);
    });

  }


}
