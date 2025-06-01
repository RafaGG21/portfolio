import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  protected title = 'portfolio';
  isDarkMode: boolean = false;
  onDarkModeChange(isDark: boolean) {
    this.isDarkMode = isDark;

    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  }
  loading = true;


  darkMode = false;
  dropdownOpen = false;
  opened = false;
  selectedLanguage = 'es';


  languages = [
    { code: 'es', name: 'Español', flag: 'assets/flags/es.png' },
    { code: 'en', name: 'English', flag: 'assets/flags/uk.png' },
    { code: 'fr', name: 'Français', flag: 'assets/flags/fr.png' }
  ];

  constructor(private translate: TranslateService) {
    translate.setDefaultLang(this.selectedLanguage);
    translate.use(this.selectedLanguage);
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 1000); // Simula carga inicial
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
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
