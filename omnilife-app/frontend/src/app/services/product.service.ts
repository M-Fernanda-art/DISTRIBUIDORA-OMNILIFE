import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Producto {
    _id?: string;
    nombre: string;
    precio: number;
    descripcion: string;
    imagen: string;
}

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private urlBase = 'http://localhost:3000/api/productos';

    constructor(private http: HttpClient) {}

    obtenerTodos(): Observable<Producto[]> {
        return this.http.get<Producto[]>(this.urlBase);
    }

    obtenerPorId(id: string): Observable<Producto> {
        return this.http.get<Producto>(`${this.urlBase}/${id}`);
    }

    crear(producto: Producto): Observable<any> {
        return this.http.post(this.urlBase, producto);
    }

    actualizar(id: string, producto: Producto): Observable<any> {
        return this.http.put(`${this.urlBase}/${id}`, producto);
    }

    eliminar(id: string): Observable<any> {
        return this.http.delete(`${this.urlBase}/${id}`);
    }
}