import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutMe } from './pages/about-me/about-me';
import { Projets } from './pages/projets/projets';

const routes: Routes = [
  { path: '', redirectTo: '/about-me', pathMatch: 'full' } ,
  { path: 'about-me', component: AboutMe },
  { path: 'projects', component: Projets }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
