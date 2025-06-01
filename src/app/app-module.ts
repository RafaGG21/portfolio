import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';

import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar';
import { AboutMe } from './pages/about-me/about-me';


@NgModule({
  declarations: [
    App,
    NavbarComponent,
    AboutMe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  bootstrap: [App]
})
export class AppModule { }
