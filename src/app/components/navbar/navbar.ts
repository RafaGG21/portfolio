import { Component, EventEmitter, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent {
  selectedLanguage: string = 'es';
  darkMode: boolean = false;
  @Output() darkModeOutput = new EventEmitter<boolean>();
  @Output() selectedLanguageOutput = new EventEmitter<string>();

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('es');
    this.translate.use('es'); // idioma por defecto
  }

  dropdownOpen = false;

toggleDropdown() {
  this.dropdownOpen = !this.dropdownOpen;
}

  languages = [
    { code: 'es', name: 'Español', flag: 'assets/flags/bandera_spain.png' },
    { code: 'fr', name: 'Français', flag: 'assets/flags/bandera_france.png' },
    { code: 'en', name: 'English', flag: 'assets/flags/bandera_uk.png' }
  ];

  getLanguageName(code: string): string {
    const lang = this.languages.find(l => l.code === code);
    return lang ? lang.name : '';
  }

  changeLanguage(langCode: string) {

    this.selectedLanguage = langCode;
    this.translate.use(this.selectedLanguage);
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    this.darkModeOutput.emit(this.darkMode)

  }
}
