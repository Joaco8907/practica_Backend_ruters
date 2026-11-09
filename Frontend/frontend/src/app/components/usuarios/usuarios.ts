import { Component, input, output, signal, computed } from '@angular/core';
import type { Iusuarios } from '../../models/Iusuarios';


@Component({
  imports: [],
  selector: 'app-usuarios',
  styleUrl: './usuarios.css',
  templateUrl: './usuarios.html',
})
export class Usuarios {

  titulo = input<string>('');

  protected readonly usuarios = signal<Iusuarios[]>([{
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
  }]);

  protected readonly cantidadUsuarios = computed(() => this.usuarios().length);
  cambioSolicitado = output<void>();

  protected readonly cantidadCandidatos = computed(() => this.usuarios().filter(usuario => usuario.tipo_usuario === "Candidato").length)

  protected readonly cantidadEmpresas = computed(() => this.usuarios().filter(usuario => usuario.tipo_usuario === "Empresa").length)

  private ultimoID = signal(Math.max(0, ...this.usuarios().map(usuario => usuario.id)))

  protected readonly nuevoNombre = signal<string>('')
  protected readonly nuevoEmail = signal<string>('')
  protected readonly tipoUsuario = signal<string>('')
  protected readonly datosCompletos = computed(()=>{
    if(this.nuevoNombre().trim() === "" || this.nuevoEmail().trim() ==="" || !this.nuevoEmail().includes("@") || this.tipoUsuario() === ""){
      return false
    }
    return true
  })

  solicitarCambioTitulo() {
    this.cambioSolicitado.emit()
  }

  usuarioSeleccionado = output<number>();

  public seleccionarUsuario(id: number): void {
    console.log(`Usuario seleccionado: ${id}`);
    this.usuarioSeleccionado.emit(id);
  }

  public crearUsuario(): void {
    if(!this.datosCompletos()){
      return;
    }
    this.ultimoID.update(valor => valor + 1)
    const nuevoId = this.ultimoID()
    const nuevoUsuario: Iusuarios = {
      id: nuevoId,
      nombre: this.nuevoNombre(),
      email: this.nuevoEmail(),
      tipo_usuario: this.tipoUsuario(),
      fecha_registro: "2026-10-05T09:10:44"
    };
    this.usuarios.update((usuarios) => [...usuarios, nuevoUsuario]);

    this.nuevoNombre.set('')
    this.nuevoEmail.set('')
    this.tipoUsuario.set('')
  }

  public eliminarUsuario(id: number): void {
    this.usuarios.update(usuarios => usuarios.filter(usuario => usuario.id !== id))
  }

  public modificarNombreUsuario(id: number, nombreEnviado: string): void {
    if (nombreEnviado.trim() === "") {
      return;
    }
    const nombre = nombreEnviado
      .trim()
      .split(" ")
      .filter(palabra => palabra !== "")
      .join(" ")

    
    this.usuarios.update(usuarioActual => {
      return usuarioActual.map(usuario => {
        if (usuario.id === id) {

          return { ...usuario, nombre }
        }
        return usuario
      })
    })
    this.nuevoNombre.set('')
  }


}

