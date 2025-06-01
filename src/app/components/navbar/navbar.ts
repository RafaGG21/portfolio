import { Component, EventEmitter, Output } from '@angular/core';

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

  changeLanguage(lang: string) {
    this.selectedLanguage = lang;
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    this.darkModeOutput.emit(this.darkMode)

  }
}
