import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: false
})
export class App implements OnInit {
  protected title = 'Rafael Gandolfo | Portfolio';
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

  toggleDarkMode() {
    this.darkMode = !this.darkMode;

    if (this.darkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
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
    const fileName = lang === 'fr' ? 'Rafael Gandolfo Garcia CV français.pdf' : lang === 'en' ?
    'Rafael Gandolfo Garcia CV english.pdf' : 'Rafael Gandolfo Garcia CV español.pdf';
    const link = document.createElement('a');
    link.href = `assets/cv/${fileName}`;
    link.download = fileName;
    link.click();
  }
}
