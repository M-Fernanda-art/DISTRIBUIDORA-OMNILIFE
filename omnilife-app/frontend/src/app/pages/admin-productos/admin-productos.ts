import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService, Producto } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'app-admin-productos',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './admin-productos.html',
    styleUrl: './admin-productos.css'
})
export class AdminProductos implements OnInit {

    productos: Producto[] = [];

    mostrarModal = false;
    modoEdicion = false;
    idEdicion = '';

    nombre = '';
    precio: number | null = null;
    descripcion = '';
    imagen = '';

    mensaje = '';
    esError = false;

    constructor(
        private productService: ProductService,
        public authService: AuthService,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.cargarProductos();
    }

    cargarProductos(): void {
        this.productService.obtenerTodos().subscribe({
        next: (respuesta) => {
            this.productos = respuesta;
            this.cdr.detectChanges();
        },
        error: (error) => {
            console.log('Error al cargar productos', error);
        }
    });
    }

    abrirCrear(): void {
        this.modoEdicion = false;
        this.idEdicion = '';
        this.nombre = '';
        this.precio = null;
        this.descripcion = '';
        this.imagen = '';
        this.mensaje = '';
        this.mostrarModal = true;
    }

    abrirEditar(producto: Producto): void {
        this.modoEdicion = true;
        this.idEdicion = producto._id!;
        this.nombre = producto.nombre;
        this.precio = producto.precio;
        this.descripcion = producto.descripcion;
        this.imagen = producto.imagen;
        this.mensaje = '';
        this.mostrarModal = true;
    }

    cerrarModal(): void {
        this.mostrarModal = false;
    }

    guardar(): void {

    this.mensaje = '';

    if (!this.nombre || !this.precio || !this.descripcion || !this.imagen) {
        this.esError = true;
        this.mensaje = 'Completa todos los campos.';
        return;
        }

    const producto: Producto = {
        nombre: this.nombre,
        precio: this.precio,
        descripcion: this.descripcion,
        imagen: this.imagen
    };

    const peticion = this.modoEdicion
        ? this.productService.actualizar(this.idEdicion, producto)
        : this.productService.crear(producto);

    peticion.subscribe({
        next: () => {
            this.cargarProductos();
            this.cerrarModal();
            this.cdr.detectChanges();
        },
        error: (error) => {
            this.esError = true;
            this.mensaje = error.error?.mensaje || 'Error desconocido.';
            this.cdr.detectChanges();
        }
        });
    }

    eliminar(id: string): void {
        if (!confirm('¿Seguro que quieres eliminar este producto?')) {
        return;
        }

        this.productService.eliminar(id).subscribe({
        next: () => {
            this.cargarProductos();
        },
        error: (error) => {
            console.log('Error al eliminar', error);
        }
        });
    }
}