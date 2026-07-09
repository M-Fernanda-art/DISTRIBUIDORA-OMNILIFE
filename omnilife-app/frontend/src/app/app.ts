import {
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren,
  AfterViewInit,
  ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
  CommonModule,
  FormsModule
  ],
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

  mostrarLogin = false;
  correo = "";
  password = "";

  mensaje = "";
  esError = false;


  constructor(
  private http: HttpClient,
  private cdr: ChangeDetectorRef
) {}

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

abrirLogin() {
  this.mostrarLogin = true;
  this.mensaje = "";
  this.correo = "";
  this.password = "";
}

cerrarLogin() {

  this.mostrarLogin = false;
  this.mensaje = "";
  this.correo = "";
  this.password = "";
}

login() {

  this.mensaje = "";

  this.http.post(
    'http://localhost:3000/api/usuarios/login',
    {
      correo: this.correo,
      password: this.password
    }
  ).subscribe({

    next: (respuesta: any) => {

      this.esError = false;
      this.mensaje = respuesta.mensaje;
      this.correo = "";
      this.password = "";
      this.cdr.detectChanges();

      setTimeout(() => {

        this.cerrarLogin();

      }, 1200);

    },

    error: (error) => {

  console.log("Entró al error");
  console.log(error);

  this.esError = true;

  if (error.error && error.error.mensaje) {
    this.mensaje = error.error.mensaje;
  } else {
    this.mensaje = "Error desconocido.";
  }

  console.log("Mensaje:", this.mensaje);
  this.cdr.detectChanges();

}

  });

}

}


