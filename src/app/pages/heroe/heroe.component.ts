import { Component, OnInit, NgModule } from '@angular/core';
import { HeroeModel } from '../../models/heroe.models';
import { NgForm } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router'





@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  public heroe: HeroeModel;


  constructor( private heroeService: HeroesService,
               private activatedRotue: ActivatedRoute ) {

      this.heroe = new HeroeModel();


   }


  ngOnInit() {
    this.obtenerHeroe();
  }

  public Guardar( forma: NgForm ){

      if( forma.invalid ) {
        console.log('Formulario no valido');
        return;
      };

      if( this.heroe.id ){
        this.actualizarHeroe()

      }else {
        this.nuevoHeroe()
      };
         
  }

  private nuevoHeroe(){

      Swal.fire({
        allowOutsideClick: false,
        title: 'Creando Heroe',
        type: 'info',
        text: 'Creando Heroe...'
      })
      Swal.showLoading();

      this.heroeService.crearHeroe( this.heroe )
                       .subscribe( res => {
                              
                               Swal.close()
                               Swal.fire({
                                 title: this.heroe.nombre,
                                 text: 'Heroe Creado',
                                 type: 'success'

                               })
                        })
  }

  private actualizarHeroe(){

    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Actualizando...'
    })
    Swal.showLoading();
    
     this.heroeService.actualizarHeroe( this.heroe )
                      .subscribe( res => {                 
                          Swal.close()
                          Swal.fire({
                          title: this.heroe.nombre,
                          text: 'Heroe Actualizado',
                          type: 'success'
                        })
                       })
  }

  private obtenerHeroe(){
     const id =  this.activatedRotue.snapshot.paramMap.get('id');

     if ( id !== 'nuevo' ){
       this.heroeService.getHeroe( id )
                        .subscribe( (data: HeroeModel) => {  
                          this.heroe = data;
                          this.heroe.id = id;
                        })
     }
  }

  

}
