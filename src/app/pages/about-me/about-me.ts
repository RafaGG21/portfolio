import { Component } from '@angular/core';

@Component({
  selector: 'app-about-me',
  standalone: false,
  templateUrl: './about-me.html',
  styleUrl: './about-me.css'
})
export class AboutMe {
  animate: boolean = false;
  ngOnInit(): void {
    // Activa la animación tras una pequeña pausa
    setTimeout(() => {
      this.animate = true;
    }, 500); // Tiempo mínimo para asegurar que Angular renderiza antes
  }
}
