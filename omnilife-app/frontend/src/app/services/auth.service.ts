import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

interface RespuestaLogin {
  mensaje: string;
  token: string;
  usuario: {
    nombre: string;
    correo: string;
    rol: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlBase = 'http://localhost:3000/api/usuarios';

  constructor(private http: HttpClient) {}

  login(correo: string, password: string): Observable<RespuestaLogin> {
    return this.http.post<RespuestaLogin>(`${this.urlBase}/login`, { correo, password }).pipe(
      tap(respuesta => {
        localStorage.setItem('token', respuesta.token);
        localStorage.setItem('usuario', JSON.stringify(respuesta.usuario));
      })
    );
  }

  registro(nombre: string, correo: string, password: string): Observable<any> {
    return this.http.post(`${this.urlBase}/registro`, { nombre, correo, password });
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUsuario(): { nombre: string; correo: string; rol: string } | null {
    const data = localStorage.getItem('usuario');
    return data ? JSON.parse(data) : null;
  }

  estaLogueado(): boolean {
    return !!this.getToken();
  }

  esAdmin(): boolean {
    const usuario = this.getUsuario();
    return usuario?.rol === 'admin';
  }
}