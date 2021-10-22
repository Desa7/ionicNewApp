import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
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
    private httpClient: HttpClient,
    public toastController: ToastController,
    public alertController:AlertController
  ) { }

  ngOnInit() {
    this.getCities().subscribe(res => {
      console.log("Res: ", res);
      this.cities = res;
    })
  }

  getCities() {
    return this.httpClient
      .get("assets/files/cities.json")
      .pipe(
        map((res: any) => {
          return res.data;
        })
      )
  }
  
  async presentToast() {
    const toast = await this.toastController.create({
      message: "Ciudad seleccionada",
      duration: 2000,
      position: "bottom"
    });
    toast.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: "Remove City",
      message: "City has been removed",
      buttons: ["OK"]
    });
    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result);
  }

  async presentAlert2() {
    const alert = await this.alertController.create({
      header: "Remove city",
      message: "¿Are you sure?",
      buttons: [
        {
          text: "YES",
          handler: () => {
            console.log("City has been removed");
          }
        },
        {
          text: "NO",
          handler: () => {
            console.log("Canceled");
          }
        }
      ]
    });
    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result);
  }

}
