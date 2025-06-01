import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: false
})
export class App implements OnInit {
  protected title = 'portfolio';
  isDarkMode = false;
  darkMode = false;
  dropdownOpen = false;
  opened = false;

  loading = false;

  selectedLanguage = 'es';
  languages = [
    { code: 'es', name: 'Español', flag: 'assets/flags/es.png' },
    { code: 'en', name: 'English', flag: 'assets/flags/uk.png' },
    { code: 'fr', name: 'Français', flag: 'assets/flags/fr.png' }
  ];

  constructor(private translate: TranslateService, private router: Router) {
    translate.setDefaultLang(this.selectedLanguage);
    translate.use(this.selectedLanguage);
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loading = true;
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        setTimeout(() => {
          this.loading = false;
        }, 1000); // 1 segundo de duración visible
      }
    });

    // Simula carga inicial
    this.loading = true;
    setTimeout(() => this.loading = false, 1000);
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

  onDarkModeChange(isDark: boolean) {
    this.isDarkMode = isDark;
    if (isDark) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  }
}
