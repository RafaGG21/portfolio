import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemeService } from '../../services/themeservice';

@Component({
  selector: 'app-home-video',
  templateUrl: './home-video.component.html',
  styleUrls: ['./home-video.component.css']
})
export class HomeVideoComponent implements AfterViewInit, OnDestroy {
  private readonly lightSrc = 'assets/video/video_light.mp4';
  private readonly darkSrc = 'assets/video/video_dark.mp4';

  @ViewChild('videoPlayer') videoRef!: ElementRef<HTMLVideoElement>;

  private themeSub?: Subscription;

  constructor(private themeService: ThemeService) {}

  ngAfterViewInit(): void {
    const video = this.videoRef.nativeElement;

    // Atributos necesarios para móviles y autoplay
    video.muted = true;
    video.playsInline = true;
    video.autoplay = true;
    video.loop = true;
    video.preload = 'auto';

    // Reintento si el vídeo se pausa
    video.addEventListener('pause', () => {
      if (!video.ended) this.tryPlay();
    });

    // Cambia el vídeo según el tema (light / dark)
    this.themeSub = this.themeService.darkMode$.subscribe(dark => {
      const src = dark ? this.darkSrc : this.lightSrc;
      if (video.getAttribute('src') !== src) {
        video.src = src;
        video.load();
        this.tryPlay();
      }
    });
  }

  private tryPlay(): void {
    const video = this.videoRef?.nativeElement;
    if (!video) return;
    video.play().catch(() => setTimeout(() => this.tryPlay(), 500));
  }

  ngOnDestroy(): void {
    this.themeSub?.unsubscribe();
  }
}
