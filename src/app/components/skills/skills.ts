import { Component } from '@angular/core';
import { ISkill } from '../../interfaces/skill.interface';

@Component({
  selector: 'skills',
  templateUrl: './skills.html',
  styleUrl: './skills.css',
  standalone: false
})
export class Skills {
  skills: ISkill[] = [
    { name: 'Angular', level: 60 },
    { name: 'Java', level: 70 },
    { name: 'Spring', level: 70 },
    { name: 'React', level: 40 },
    { name: 'Javascript', level: 40 },
    { name: 'Python', level: 40 },
    { name: 'NodeJS', level: 40 },
    { name: 'HTML/CSS', level: 70 },
    { name: 'Microservices', level: 50 },
    { name: 'PHP', level: 40 },
    { name: 'Docker', level: 40 }
  ];
}
