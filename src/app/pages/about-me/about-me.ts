import { Component } from '@angular/core';
import { ThemeService } from '../../services/themeservice';

@Component({
  selector: 'app-about-me',
  standalone: false,
  templateUrl: './about-me.html',
  styleUrl: './about-me.css'
})
export class AboutMe {
  darkMode: boolean = false;
  animate: boolean = false;

  constructor(private themeService: ThemeService) {}
  ngOnInit(): void {
    setTimeout(() => {
      this.animate = true;
    }, 500);
    this.themeService.darkMode$.subscribe(value => {
      this.darkMode = value;
    });
  }
}
