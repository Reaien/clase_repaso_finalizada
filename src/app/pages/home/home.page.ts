import { Component } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ToastController, ToastOptions } from '@ionic/angular';
import { ServiceRestService } from 'src/app/services/service-rest.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  data: any;


  zoologicos: any; //para alojar el zooList
  zoologico: any={
    id: null,
    nombre: "",
    calificacion: "",
    ciudad: "",
    pais: ""
  }



  constructor(private activateRoute: ActivatedRoute, private router: Router, private api: ServiceRestService, private toastController: ToastController) { 
    this.activateRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.data = this.router.getCurrentNavigation()?.extras.state?.['user'];
      }else{
        this.router.navigate(["/inicio"]);
      }
    });

    
  }

  ionViewWillEnter() {
    this.getZooList()
  }

  limpiar(){
    this.zoologico.nombre="";
    this.zoologico.calificacion="";
    this.zoologico.ciudad="";
    this.zoologico.pais="";
  }

  //=========GET ALL ZOO============
  getZooList(){
    this.api.getZooList().subscribe((data) =>{
      console.log(data); //para confirmar que se trajo la lista de zoo
      this.zoologicos=data;
    });
  }

  //=====AGREGAR ZOOLOGICO=====
  addZoo(){
    if (this.zoologico.nombre=="" || this.zoologico.calificacion=="" || this.zoologico.ciudad=="" || this.zoologico.pais=="") {
      this.presentToast({
        message: 'Error al registrar zoologio, debe llenar los campos',
        duration: 3000,
        position: 'middle',
        icon: 'alert-circle-outline'
      });
      return;
    }else{
      this.api.addZoo(this.zoologico).subscribe({
        next: (() => {
          console.log("Zoo Creado correctamente: "+this.zoologico);
          this.getZooList();
          this.limpiar();
        }),
        error: (error => {
          console.log("Error " + error)
        })
      });      
    }
  }

  //==========EDITAR POR ID=======
  getZooId(id: any){
    this.api.getZooId(id).subscribe((data) => {
      console.log(data)
      this.zoologico = data
    })
  }

  //=========ELIMINAR ZOO POR ID==========
  deleteZoo(id: any){
    this.api.deleteZoo(id).subscribe({
      next: (() => {
        this.presentToast({
          message: 'Zoologico eliminado',
          duration: 3000,
          position: 'middle',
          icon: 'alert-circle-outline'
        });
        console.log("Zoo Elminado Correctamente");
        this.getZooList();
      }),
      error: (error => {
        console.log("Error " + error)
      })      
    });
  }



  //============CERRAR SESION=======
  cerrarSesion(){
    localStorage.removeItem('ingresado');
    this.router.navigate(["/inicio"]);
  }


  async presentToast(opts?: ToastOptions) {
    const toast = await this.toastController.create(opts);
    toast.present();
  }




}
