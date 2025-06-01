
import { Component, ElementRef, AfterViewInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-career',
  standalone: false,
  templateUrl: './career.html',
  styleUrl: './career.css'
})
export class Career implements AfterViewInit {
  @ViewChild('trajectoryBox', { static: false }) trajectoryBox!: ElementRef;

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const path = this.trajectoryBox.nativeElement.querySelector('.trajectory-path');
        if (entry.isIntersecting && path) {
          path.classList.add('animate-path');
          observer.disconnect(); // Elimina esto si quieres que se anime cada vez
        }
      },
      {
        threshold: 0.3
      }
    );

    if (this.trajectoryBox?.nativeElement) {
      observer.observe(this.trajectoryBox.nativeElement);
    }
  }

  steps = [
    { title: 'FP Desarrollo Web', description: 'Formación Profesional de 2 años enfocada en desarrollo web (HTML, CSS, JS, PHP).' },
    { title: 'Bootcamp Java Fullstack', description: 'Curso intensivo con Java, Spring, Angular, SQL, REST APIs y DevOps.' },
    { title: 'Curso Python IA', description: 'Curso online sobre Inteligencia Artificial aplicada con Python (scikit-learn, pandas).' },
    { title: 'Proyecto Personal', description: 'Portfolio personal con Angular, animaciones, dark mode y i18n.' },
    { title: 'Trabajo en Inetum', description: '3 años de experiencia en proyectos reales usando Java, Spring, JSF y Jenkins.' }
  ];
  getStepLeft(index: number): number {
    const positions = [6, 19, 43, 67, 93];
    return positions[index] ?? 50;
  }
  getStepTop(index: number): number {
    const positions = [
      50,  // Punto 1 - centro base
      90,  // Punto 2 - más abajo (valle pronunciado)
      10,  // Punto 3 - más arriba (cima)
      85,  // Punto 4 - más abajo (otro valle profundo)
      50   // Punto 5 - centro base
    ];
    return positions[index] ?? 50;
  }




}
