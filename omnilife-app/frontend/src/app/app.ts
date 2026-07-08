import {
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren,
  AfterViewInit
} from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit {

  @ViewChild('trackCards')
  trackCards!: ElementRef;

  @ViewChildren('card')
  cards!: QueryList<ElementRef>;

  @ViewChild('trackMakeup')
  trackMakeup!: ElementRef;

  @ViewChildren('makeupCard')
  makeupCards!: QueryList<ElementRef>;

  @ViewChild('video')
  video!: ElementRef<HTMLVideoElement>;

  posicionActual = 0;

  readonly cardWidth = 304;
  readonly cardsVisibles = 4;

  readonly cardsPorVista = 5;
  cardWidthMakeup = 0;

  paginaActiva = 0;

  ngAfterViewInit() {

    this.cardWidthMakeup =
      this.makeupCards.first.nativeElement.offsetWidth + 5;

    const observer = new IntersectionObserver((entries) => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {
          this.video.nativeElement.play();
        } else {
          this.video.nativeElement.pause();
        }
      });
    }, {
      threshold: 0.5
    });

    observer.observe(this.video.nativeElement);

  }
  siguiente() {

  if (this.posicionActual < this.cards.length - this.cardsVisibles) {

    this.posicionActual++;

    this.trackCards.nativeElement.style.transform =
    `translateX(-${this.posicionActual * this.cardWidth}px)`;
  }

}

anterior() {

  if (this.posicionActual > 0) {

    this.posicionActual--;

    this.trackCards.nativeElement.style.transform =
      `translateX(-${this.posicionActual * this.cardWidth}px)`;
  }
  
}

irPagina(indice: number) {

  this.paginaActiva = indice;

  this.trackMakeup.nativeElement.style.transform =
    `translateX(-${indice * this.cardWidthMakeup * this.cardsPorVista}px)`;

}
}

