import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutMe } from './pages/about-me/about-me';

const routes: Routes = [
  { path: 'about-me', component: AboutMe }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
