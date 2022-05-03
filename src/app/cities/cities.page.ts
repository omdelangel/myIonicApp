import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/Operators';
import { AlertController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-cities',
  templateUrl: './cities.page.html',
  styleUrls: ['./cities.page.scss'],
})
export class CitiesPage implements OnInit {

  cities: any = [];

  constructor(
    private router: Router,
    private http: HttpClient,
    public toastController: ToastController,
    public alertController: AlertController ) { }

  ngOnInit() {
    console.log('Cargando ciudades');
    this.getCities().subscribe(res => {
        console.log('Res', res);
        this.cities = res;
    });
  }

  getCities() {
    return this.http
    .get('assets/files/cities.json')
    .pipe( map((res: any) =>res.data) );
  }

  async presentToast1(msg: string){
    const toast = await this.toastController.create({
      message: 'Ciudad seleccionada: ' + msg,
      duration: 1000,
      position: 'bottom',
    });
    toast.present();
  }

  async presentAlert1(msg: string){
    const alert = await this.alertController.create({
      header: 'Borrar Ciudad',
      message: 'Se ha borrado la ciudad '+ msg +' correctamente',
      buttons: ['OK'],
    });
    await alert.present();
    const result = await alert.onDidDismiss();
    console.log(result);
  }

  async presentAlert2(msg: string){
    const alert = await this.alertController.create({
      header: 'Borrar Ciudad',
      message: '¿Estas seguro de borrar la Cd. '+msg+' ?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('No cancel');
          }
        },
        {
          text: 'Si',
          handler: () => {
            console.log(msg + ' ha sido eliminada');
          }
        }
      ]
    });
    await alert.present();
    const result = await alert.onDidDismiss();
    console.log(result);
  }
}
