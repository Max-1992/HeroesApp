import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.models';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url:string = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apiKey:string = 'AIzaSyB3731FAcvDOWV1kchR-lt9--6ClIFGcUU';
  private userToken: string;

//Crear nuevo usuario
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

//Login
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor( private http: HttpClient ) { 
    this.leerToken();
  }

  public login( usuario: UsuarioModel ){
 
    const authData = {
      ...usuario,
      returnSecureToken: true
    }

   return this.http.post(`${this.url}signInWithPassword?key=${this.apiKey}`, authData)
                   .pipe(
                     map(resp => {
                       this.saveToken(resp['idToken'], resp['expiresIn'])
                       return resp;
                     })
                   )
  };

  public logout(){
    localStorage.removeItem('token');
  };

  public newUser( usuario: UsuarioModel ){
    const authData = {
      ...usuario,
      returnSecureToken: true
    };

   return this.http.post(`${this.url}signUp?key=${this.apiKey}`, authData)
                   .pipe(
                     map( resp => {
                        this.saveToken(resp['idToken'], resp['expiresIn'])
                        return resp;
                     })
                   )
  };

  private saveToken( idToken: string, expiration: number){
      this.userToken = idToken;
      localStorage.setItem('token', this.userToken);

      let hoy = new Date();
      hoy.setSeconds( expiration );

      localStorage.setItem('expiration', hoy.getTime().toString());

  };

  public leerToken(){

    if( localStorage.getItem('token') ){
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }

    return this.userToken;
  };

  estadoAutenticacion(){

    if( this.userToken.length < 2 ){
      return false;
    }

    const expiracion = Number(localStorage.getItem('expiration'));
    
    const expiracionToken = new Date();
    expiracionToken.setTime(expiracion);

    if( expiracionToken > new Date() ){
       return true;
    } else {
      return false;
    }
  }



}
