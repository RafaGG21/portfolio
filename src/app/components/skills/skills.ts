import { AfterViewInit, Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { ISkill } from '../../interfaces/skill.interface';

@Component({
  selector: 'skills',
  templateUrl: './skills.html',
  styleUrl: './skills.css',
  standalone: false
})
export class Skills implements AfterViewInit{
  skills: ISkill[] = [
    { name: 'Angular', level: 60 },
    { name: 'Java', level: 70 },
    { name: 'Spring', level: 70 },
    { name: 'React', level: 40 },
    { name: 'Javascript', level: 60 },
    { name: 'Python', level: 40 },
    { name: 'NodeJS', level: 40 },
    { name: 'HTML/CSS', level: 70 },
    { name: 'Microservices', level: 50 },
    { name: 'PHP', level: 40 },
    { name: 'Docker', level: 40 }
  ];

  @ViewChildren('skillFill') skillFills!: QueryList<ElementRef>;

  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          const percent = el.getAttribute('data-percent');

          if (entry.isIntersecting && percent) {
            el.style.width = `${percent}%`;
          } else {
            el.style.width = '0%'; // reinicia para reanimar cada vez
          }
        });
      },
      { threshold: 0.6 }
    );

    this.skillFills.forEach((el) => observer.observe(el.nativeElement));
  }
}
