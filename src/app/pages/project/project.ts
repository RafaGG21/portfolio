import { HttpClient } from '@angular/common/http';
import { Component, OnInit, AfterViewInit  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProject } from '../../interfaces/project.interface';
import $ from 'jquery';
import { ThemeService } from '../../services/themeservice';
import { LanguageService } from '../../services/language-service';



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
  }

}
