import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'; //librerias importadas para crear formulario, controlar y validar registros
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user = {
    usuario: '',
    password: '',
  };

  //se le da formato a la variable
  formularioLogin: FormGroup;

  //contructor publico que se crea a partir del FormBuilder, se le dan parametros que se quieren aplicar en el formlario
  constructor(
    public fb: FormBuilder,
    public alertController: AlertController,
    public navCtrl: NavController,
    private router: Router
  ) {
    //modulos a importar

    this.formularioLogin = this.fb.group({
      nombre: new FormControl('', Validators.required), //como será llamado, se le asigna como nuevo objeto new FormControl y se le dan los parametros que estará vacio y que se requiere validar
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {}

  async ingresar() {
    localStorage.setItem('ingresado','true');
    let navigationExtras: NavigationExtras = {
      state: {
        user: this.user,
      },
    };

    this.router.navigate(['/home'], navigationExtras);
  }
}
