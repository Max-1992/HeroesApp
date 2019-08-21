import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroeModel } from '../../models/heroe.models';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

 public heroes: HeroeModel[];
 public cargando: boolean;

  constructor(private heroesService: HeroesService,
              private authService: AuthService,
              private router: Router ) { }

  ngOnInit() {
    this.cargando = true;
    this.ObtenerHeroe()
  }

  ObtenerHeroe(){
    this.heroesService.getHeroes()
                      .subscribe( resp => {
                        this.heroes = resp;
                        this.cargando = false;
                      }
                      );
  }

  // borrarHeroe( id: string, i: number ){
  //   this.heroes.splice(i, 1);
  //   this.heroesService.deleteHeroe( id ).subscribe();
  // }

  // borrarHeroe( heroe: HeroeModel, i: number ){

  //   this.heroesService.deleteHeroe( heroe.id ).subscribe( res => this.heroes.splice(i, 1) );
  // }

  borrarHeroe( heroe: HeroeModel, i: number ){

    Swal.fire({
      title: '¿Esta seguro?',
      text: `Esta seguro de que desea eliminar a ${heroe.nombre}`,
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {

      if(resp.value){
        this.heroesService.deleteHeroe( heroe.id )
                          .subscribe( res => this.heroes.splice(i, 1) );   
      }

    })

  }

  logaut(){
    this.authService.logout();
    this.router.navigateByUrl('/login')
  }


}
