import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { CustomTranslateLoader } from './services/translate-loader';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar';
import { AboutMe } from './pages/about-me/about-me';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Projets } from './pages/projets/projets';
import { Career } from './components/career/career';


import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { Contact } from './pages/contact/contact';
import { PopupDescription } from './components/popup-description/popup-description';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    App,
    NavbarComponent,
    AboutMe,
    Projets,
    Career,
    Contact,
    PopupDescription
  ],
  imports: [
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatToolbarModule,
    HttpClientModule, //
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      defaultLanguage: 'es',
      loader: {
        provide: TranslateLoader,
        useClass: CustomTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  bootstrap: [App]
})
export class AppModule { }
