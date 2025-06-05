import { HttpClient } from '@angular/common/http';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProject } from '../../interfaces/project.interface';
import { ThemeService } from '../../services/themeservice';
import { LanguageService } from '../../services/language-service';
import { Carousel } from 'bootstrap';

@Component({
  selector: 'project',
  standalone: false,
  templateUrl: './project.html',
  styleUrl: './project.css'
})
export class Project implements OnInit {
  project!: IProject;


  constructor(private route: ActivatedRoute, private http: HttpClient,
    private themeService: ThemeService, private languageService: LanguageService) {}

    darkMode: boolean = false;
    language: string = 'es'
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.http.get<any[]>('assets/data/projects.json').subscribe(projects => {
      this.project = projects.find(p => p.id === id);
    });

    this.themeService.darkMode$.subscribe(value => {
      this.darkMode = value;
    });

    this.languageService.language$.subscribe(value => {
      this.language = value;
    });
    this.startAutoSlide();
  }


  currentIndex = 0;
  intervalId: any;

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  startAutoSlide(): void {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 2000);
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.project.images.length;
  }

  prevSlide(): void {
    this.currentIndex = (this.currentIndex - 1 + this.project.images.length) % this.project.images.length;
  }

  goToSlide(index: number): void {
    this.currentIndex = index;
  }

}
