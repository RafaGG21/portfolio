import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  OnDestroy,
  Renderer2
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
  private intervalId: any;
  private sub: Subscription | null = null;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    if (!this.translationKey) return;

    this.sub = this.translate.get(this.translationKey).subscribe(translated => {
      this.revealText(translated);
    });

    // Escucha cambios de idioma
    this.translate.onLangChange.subscribe(() => {
      this.reset();
      this.translate.get(this.translationKey).subscribe(translated => {
        this.revealText(translated);
      });
    });
  }

  revealText(text: string) {
    let index = 0;
    const length = text.length;
    this.renderer.setProperty(this.el.nativeElement, 'textContent', '');

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
    clearInterval(this.intervalId);
    this.sub?.unsubscribe();
  }
}
