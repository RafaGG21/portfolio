import { Directive, ElementRef, Input, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appRevealText]',
  standalone: false
})
export class RevealTextDirective implements AfterViewInit {
  @Input('appRevealText') speed: number = 20; // velocidad por defecto

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    const element = this.el.nativeElement;
    const rawText = element.innerText.trim();

    // Reemplazamos espacios por &nbsp; para mantenerlos
    const fullText = rawText.replace(/ /g, ' ').replace(/\n/g, '<br>');

    element.innerHTML = ''; // Limpiamos el texto inicial

    let i = 0;
    const interval = setInterval(() => {
      element.innerHTML += fullText.charAt(i);
      i++;
      if (i >= fullText.length) {
        clearInterval(interval);
      }
    }, this.speed);
  }
}
