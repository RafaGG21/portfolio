import { Component } from '@angular/core';

@Component({
  selector: 'app-career',
  standalone: false,
  templateUrl: './career.html',
  styleUrl: './career.css'
})
export class Career {
  steps = [
    { title: 'FP Desarrollo Web', description: 'Formación Profesional de 2 años enfocada en desarrollo web (HTML, CSS, JS, PHP).' },
    { title: 'Bootcamp Java Fullstack', description: 'Curso intensivo con Java, Spring, Angular, SQL, REST APIs y DevOps.' },
    { title: 'Curso Python IA', description: 'Curso online sobre Inteligencia Artificial aplicada con Python (scikit-learn, pandas).' },
    { title: 'Proyecto Personal', description: 'Portfolio personal con Angular, animaciones, dark mode y i18n.' },
    { title: 'Trabajo en Inetum', description: '3 años de experiencia en proyectos reales usando Java, Spring, JSF y Jenkins.' }
  ];
  getStepTop(index: number): number {
    // Alterna entre altos y bajos según los picos de la curva SVG
    const positions = [30, 70, 30, 70, 30]; // puedes extender para más puntos
    return positions[index % positions.length];
  }

}
