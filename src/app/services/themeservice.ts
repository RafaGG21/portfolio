import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkModeSubject = new BehaviorSubject<boolean>(false);
  darkMode$ = this.darkModeSubject.asObservable();

  setDarkMode(value: boolean) {
    this.darkModeSubject.next(value);
  }

  getDarkMode(): boolean {
    return this.darkModeSubject.getValue();
  }
}
