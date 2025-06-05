import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupDescription } from '../popup-description/popup-description';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-career',
  standalone: false,
  templateUrl: './career.html',
  styleUrl: './career.css'
})
export class Career implements AfterViewInit {
  @ViewChild('trajectoryBox', { static: false }) trajectoryBox!: ElementRef;

  constructor(private dialog: MatDialog, private translate: TranslateService) {}

  ngAfterViewInit(): void {
    const path = this.trajectoryBox.nativeElement.querySelector('.trajectory-path');

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && path) {
          // Reiniciar animación usando requestAnimationFrame para asegurar el reflow
          path.classList.remove('animate-path');

          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              path.classList.add('animate-path');
            });
          });
        }
      },
      { threshold: 0.3 }
    );

    if (this.trajectoryBox?.nativeElement) {
      observer.observe(this.trajectoryBox.nativeElement);
    }
  }

  handleClick(titleKey: string, descriptionKey: string): void {
    const title = this.translate.instant(titleKey);
    const description = this.translate.instant(descriptionKey);
    this.openPopup(title, description);
  }

  openPopup(title: string, description: string): void {
    this.dialog.open(PopupDescription, {
      data: { title, description }
    });
  }
}
