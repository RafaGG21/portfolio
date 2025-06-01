import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
  standalone: false
})
export class NavbarComponent implements OnInit{

  @Output() darkModeOutput = new EventEmitter<boolean>();
  darkMode = false;
  dropdownOpen = false;
  opened = false;
  selectedLanguage = 'es';
  languages = [
    { code: 'es', name: 'Español', flag: 'assets/flags/es.png' },
    { code: 'en', name: 'English', flag: 'assets/flags/uk.png' },
    { code: 'fr', name: 'Français', flag: 'assets/flags/fr.png' }
  ];
  loading = true;

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 1000); // 1 segundo
  }
  constructor(private translate: TranslateService) {
    translate.setDefaultLang(this.selectedLanguage);
    translate.use(this.selectedLanguage);
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    this.darkModeOutput.emit(this.darkMode);
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  changeLanguage(langCode: string) {
    this.selectedLanguage = langCode;
    this.dropdownOpen = false;
    this.translate.use(langCode);
  }

  getLanguageName(code: string): string {
    const lang = this.languages.find(l => l.code === code);
    return lang ? lang.name : code;
  }
}
