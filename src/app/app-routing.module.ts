import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroeComponent } from './pages/heroe/heroe.component';
import { HeroesComponent } from './pages/heroes/heroes.component'
import { LoginComponent } from './auth/login/login.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { AuthGuard } from './guard/auth.guard';


const routes: Routes = [
  {path:'login', component: LoginComponent },
  {path:'registro', component: RegistroComponent },
  {path:'heroes', component: HeroesComponent, canActivate: [ AuthGuard ] },
  {path:'heroe/:id', component: HeroeComponent, canActivate: [ AuthGuard ]},
  {path:'**', pathMatch: 'full', redirectTo: 'heroes' }
]

 
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
