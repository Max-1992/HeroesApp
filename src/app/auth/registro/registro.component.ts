import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../models/usuario.models';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';





@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public usuario: UsuarioModel;
  public recordar: boolean = true;

  constructor( private router: Router,
               private authService: AuthService ) {
      
   }

  ngOnInit() {
    this.usuario = new UsuarioModel();
    this.leerUsuario();
  }

  registrarse( forma:FormGroup ){
    
    if( forma.invalid ){
      console.log('El formulario no es valido')
      return;
    }

    this.newUser()

    
 
  };

  newUser(){
      this.authService.newUser(this.usuario)
                      .subscribe( resp => {
                          console.log(resp)
                          if ( this.recordar ){
                            localStorage.setItem('email', this.usuario.email)
                          }
                          this.router.navigate(['/heroes'])
      }, (err) => {
        
      })
  }

  private leerUsuario(){

    if ( localStorage.getItem('email') ){
      this.recordar = true;
    }


  }

}
