import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProject } from '../../interfaces/project.interface';

@Component({
  selector: 'app-projets',
  standalone: false,
  templateUrl: './projets.html',
  styleUrl: './projets.css'
})
export class Projets {
  projects: IProject[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<IProject[]>('assets/data/projects.json').subscribe((data: IProject[]) => {
      this.projects = data;
    });
  }
}
