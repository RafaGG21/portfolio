import { HttpClient } from '@angular/common/http';
import { Component, OnInit, AfterViewInit  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProject } from '../../interfaces/project.interface';
import $ from 'jquery';


@Component({
  selector: 'project',
  standalone: false,
  templateUrl: './project.html',
  styleUrl: './project.css'
})
export class Project implements OnInit, AfterViewInit {
  project!: IProject;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.http.get<any[]>('assets/data/projects.json').subscribe(projects => {
      this.project = projects.find(p => p.id === id);
    });
  }

  ngAfterViewInit(): void {
    $('#carouselExampleIndicators').carousel({
      interval: 1000,
      ride: 'carousel'
    });
  }
}
