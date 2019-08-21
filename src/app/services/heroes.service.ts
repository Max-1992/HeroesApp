import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.models';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://crud-8d71f.firebaseio.com';

  constructor( private http: HttpClient ) { }

  public crearHeroe( heroe: HeroeModel ) {
      return this.http.post(`${this.url}/heroes.json`, heroe)
                      .pipe(
                        map( (res: any) => {
                          heroe.id = res.name;
                          return heroe;
                        })
                      )
  }

  public actualizarHeroe( heroe: HeroeModel ){
      
      const heroeTemp = {
          ...heroe
      }

      delete heroeTemp.id

      return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroeTemp);
  }

  public getHeroes(){
    return this.http.get(`${this.url}/heroes.json`)
                    .pipe(
                      map( resp => {
                         return this.crearArray(resp);
                      })
                    )
  }

  getHeroe( id: string ){
     return this.http.get(`${this.url}/heroes/${id}.json`);
  }

  deleteHeroe( id: string ){
    return this.http.delete(`${this.url}/heroes/${id}.json`)
  }

  private crearArray( heroesObj: object ){
      
    const heroes: HeroeModel[] = [];

    if( heroesObj === null ){
      return [];
    }

    Object.keys( heroesObj ).forEach( element => {
        const heroe: HeroeModel = heroesObj[element];
        heroe.id = element;

        heroes.push(heroe);
    })

    return heroes;

  }


}
