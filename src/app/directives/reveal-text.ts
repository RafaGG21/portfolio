import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  OnInit,
  OnDestroy
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appRevealText]',
  standalone: false
})
export class RevealTextDirective implements OnInit, OnDestroy {
  @Input('appRevealText') translationKey: string = '';
  @Input() delay: number = 40;

  private observer!: IntersectionObserver;
  private intervalId: any;
  private sub: Subscription | null = null;
  private lastText: string = '';

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    if (!this.translationKey) return;

    // Suscribirse a cambios de idioma
    this.sub = this.translate.get(this.translationKey).subscribe(translated => {
      this.lastText = translated;
      this.setupObserver();
    });

    this.translate.onLangChange.subscribe(() => {
      this.translate.get(this.translationKey).subscribe(translated => {
        this.lastText = translated;
        this.revealText(translated);
      });
    });
  }

  setupObserver() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.revealText(this.lastText);
          }
        });
      },
      {
        threshold: 0.5 // El 50% del elemento debe ser visible
      }
    );

    this.observer.observe(this.el.nativeElement);
  }

  revealText(text: string) {
    this.reset();

    let index = 0;
    const length = text.length;

    this.intervalId = setInterval(() => {
      if (index < length) {
        this.renderer.setProperty(
          this.el.nativeElement,
          'textContent',
          text.slice(0, index + 1)
        );
        index++;
      } else {
        clearInterval(this.intervalId);
      }
    }, this.delay);
  }

  reset() {
    clearInterval(this.intervalId);
    this.renderer.setProperty(this.el.nativeElement, 'textContent', '');
  }

  ngOnDestroy(): void {
    this.reset();
    this.sub?.unsubscribe();
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
