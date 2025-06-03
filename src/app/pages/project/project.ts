import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProject } from '../../interfaces/project.interface';
@Component({
  selector: 'project',
  standalone: false,
  templateUrl: './project.html',
  styleUrl: './project.css'
})
export class Project implements OnInit{
  project!: IProject;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.http.get<any[]>('assets/data/projects.json').subscribe(projects => {
      this.project = projects.find(p => p.id === id);
    });
  }

}
