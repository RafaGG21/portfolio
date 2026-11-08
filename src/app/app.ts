import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { ThemeService } from './services/themeservice';
import { LanguageService } from './services/language-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: false
})
export class App implements OnInit {
  protected title = 'Rafael Gandolfo | Portfolio';
  darkMode = false;
  dropdownOpen = false;
  opened = false;

  loading = false;

  selectedLanguage = localStorage.getItem('language') || 'es';
  languages = [
    { code: 'es', name: 'Español', flag: 'assets/flags/es.png' },
    { code: 'en', name: 'English', flag: 'assets/flags/uk.png' },
    { code: 'fr', name: 'Français', flag: 'assets/flags/fr.png' },
    { code: 'de', name: 'Deutsch', flag: 'assets/flags/de.png' }
  ];

  constructor(private translate: TranslateService, private router: Router,
    private themeService: ThemeService, private languageService: LanguageService
  ) {
    // Idioma guardado (solo si es uno de los disponibles)
    const savedLang = this.readStorage('language');
    if (savedLang && this.languages.some(l => l.code === savedLang)) {
      this.selectedLanguage = savedLang;
    }
    translate.setDefaultLang('es');
    translate.use(this.selectedLanguage);
    this.languageService.setLanguage(this.selectedLanguage);

    // Tema guardado
    this.applyTheme(this.readStorage('theme') === 'dark');
  }

  private readStorage(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  private writeStorage(key: string, value: string): void {
    try {
      localStorage.setItem(key, value);
    } catch {
      // localStorage no disponible (modo privado, bloqueado...): se ignora
    }
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

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  changeLanguage(langCode: string) {
    this.selectedLanguage = langCode;
    this.dropdownOpen = false;
    this.translate.use(langCode).subscribe(() => {
      this.showLanguageToast();
    });
    this.languageService.setLanguage(langCode);
    this.writeStorage('language', langCode);
  }

  private showLanguageToast() {
    Swal.fire({
      toast: true,
      position: 'top',
      icon: 'success',
      title: this.translate.instant('LANGUAGE_CHANGED'),
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true
    });
  }

  getLanguageName(code: string): string {
    const lang = this.languages.find(l => l.code === code);
    return lang ? lang.name : code;
  }

  toggleDarkMode() {
    this.applyTheme(!this.darkMode);
    this.writeStorage('theme', this.darkMode ? 'dark' : 'light');
  }

  private applyTheme(dark: boolean) {
    this.darkMode = dark;
    document.body.classList.toggle('dark-mode', dark);
    document.body.classList.toggle('light-mode', !dark);
    this.themeService.setDarkMode(dark);
  }

  confirmDownload() {
    this.translate.get(['CV.TITLE', 'CV.TEXT', 'CV.CONFIRM', 'CV.CANCEL']).subscribe(translations => {
      Swal.fire({
        title: translations['CV.TITLE'],
        text: translations['CV.TEXT'],
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#aaa',
        confirmButtonText: translations['CV.CONFIRM'],
        cancelButtonText: translations['CV.CANCEL']
      }).then((result) => {
        if (result.isConfirmed) {
          this.downloadCV();
        }
      });
    });
  }

  downloadCV() {
    const lang = this.translate.currentLang || 'es';
    const fileName = lang === 'fr' ? 'Rafael Gandolfo Garcia CV français.pdf' : (lang === 'en' || lang === 'de') ?
    'Rafael Gandolfo Garcia CV english.pdf' : 'Rafael Gandolfo Garcia CV español.pdf';
    const link = document.createElement('a');
    link.href = `assets/cv/${fileName}`;
    link.download = fileName;
    link.click();
  }
}
