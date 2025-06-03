import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../../interfaces/project.interface';

@Component({
  selector: 'app-projets',
  standalone: false,
  templateUrl: './projets.html',
  styleUrl: './projets.css'
})
export class Projets {
  projects: Project[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<Project[]>('assets/data/projects.json').subscribe((data: Project[]) => {
      this.projects = data;
    });
  }
}
