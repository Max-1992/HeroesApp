import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { UsuarioModel } from '../../models/usuario.models';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public usuario: UsuarioModel;
  public recordar: boolean = false;

  constructor( private router: Router,
               private authService: AuthService) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
    this.leerUsuario();
  }

  login(form:FormGroup){

    if( form.invalid ){
      return;
    }

    this.authService.login(this.usuario).subscribe(resp => {
        console.log(resp)
        if( this.recordar ){
          localStorage.setItem('email', this.usuario.email)
        }

        this.router.navigate(['/heroes']);

    }, (err) => {
      console.log(err)
    })

  };

  leerUsuario(){
    if( localStorage.getItem('email') ){
      this.usuario.email = localStorage.getItem('email');
      this.recordar = true;
    }
  }
  

}
