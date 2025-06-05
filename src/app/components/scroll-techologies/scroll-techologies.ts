import { Component } from '@angular/core';

@Component({
  selector: 'scroll-techologies',
  templateUrl: './scroll-techologies.html',
  styleUrl: './scroll-techologies.css',
  standalone: false
})
export class ScrollTechologies {
  techsFront = [
    'Angular', 'React', 'HTML', 'CSS', 'React', 'Javascript', 'Typescript',
  ];

  techsBack = [
    'Java', 'Spring', 'Microservicios', 'NodeJs', 'Docker', 'PHP', 'Python', 'SQL'
  ];
}
