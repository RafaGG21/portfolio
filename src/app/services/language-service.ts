import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private languajeSubject = new BehaviorSubject<string>("es");
  language$ = this.languajeSubject.asObservable();

  setLanguage(value: string) {
    this.languajeSubject.next(value);
  }

  getLanguage(): string {
    return this.languajeSubject.getValue();
  }
}

