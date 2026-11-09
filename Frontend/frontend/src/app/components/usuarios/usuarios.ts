import { Component, input, output } from '@angular/core';
import type { Iusuarios } from '../../models/Iusuarios';


@Component({
  imports: [],
  selector: 'app-usuarios',
  styleUrl: './usuarios.css',
  templateUrl: './usuarios.html',
})
export class Usuarios {

  titulo = input<string>('');

  usuarios: Iusuarios[] = [{
    id: 1,
    nombre: "Ana",
    email: "ana@example.com",
    tipo_usuario: "Candidato",
    fecha_registro: "2026-10-01T10:00:00"
  }, {
    id: 2,
    nombre: "Luis",
    email: "luis@example.com",
    tipo_usuario: "Empresa",
    fecha_registro: "2026-10-02T11:30:00"
  },
  {
    id: 3,
    nombre: "Sergio",
    email: "sergio@example.com",
    tipo_usuario: "Candidato",
    fecha_registro: "2026-10-03T09:15:00"
  }]

  cambioSolicitado = output<void>();

  solicitarCambioTitulo() {
    this.cambioSolicitado.emit()
  }

  usuarioSeleccionado = output<number>();

  public seleccionarUsuario(id: number): void {
    console.log(`Usuario seleccionado: ${id}`);
    this.usuarioSeleccionado.emit(id);
  }

}
