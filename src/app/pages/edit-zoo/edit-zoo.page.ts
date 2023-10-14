import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ToastController, ToastOptions } from '@ionic/angular';
import { ServiceRestService } from 'src/app/services/service-rest.service';

@Component({
  selector: 'app-edit-zoo',
  templateUrl: './edit-zoo.page.html',
  styleUrls: ['./edit-zoo.page.scss'],
})
export class EditZooPage implements OnInit {

  data:any;

  zoologicos: any;

  zoologico: any={
    id: null,
    nombre: "",
    calificacion: "",
    ciudad: "",
    pais: ""
  }

  constructor(private router: Router, private api: ServiceRestService, private toastController: ToastController, public navCtrl: NavController) { 
  }

  ngOnInit() {
    this.getZooId(this.getIdFromURL());
  }

  //=====METODO PARA OBTENER ID=====
  getIdFromURL(){
    let url = this.router.url;
    let arr = url.split("/", 3);
    let id = parseInt(arr[2])
    return id;

  }

  //===ACTUALIZAR ZOO POR ID Y CARDS EN HOME=====
  updateZoo(){
    this.api.updateZoo(this.zoologico.id, this.zoologico).subscribe({
      next: (() =>{
        console.log("Actualizado correctamente: "+this.zoologico);
        this.getZooList()
        this.presentToast({
          message: 'Datos del zoologico actualizados, redirigiendo al Home',
          duration: 3000,
          position: 'middle',
          icon: 'alert-circle-outline'
        });
        this.router.navigateByUrl('home');
      }),
      error: (error => {
        console.log("Error " + error)
      })
    });
  }

  getZooId(id: any){
    this.api.getZooId(id).subscribe((data) => {
      console.log(data)
      this.zoologico = data
    })
  }

    //=========GET ALL ZOO============
    getZooList(){
      this.api.getZooList().subscribe((data) =>{
        console.log(data); //para confirmar que se trajo la lista de zoo
        this.zoologicos=data;
      });
    }




  async presentToast(opts?: ToastOptions) {
    const toast = await this.toastController.create(opts);
    toast.present();
  }



}
