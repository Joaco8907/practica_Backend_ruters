import { Component, input, output, signal, computed, inject } from '@angular/core';
import { UsuariosService } from '../../Services/usuarios.service'
import { Iusuarios } from '../../models/Iusuarios';


@Component({
  imports: [],
  selector: 'app-usuarios',
  styleUrl: './usuarios.css',
  templateUrl: './usuarios.html',
})
export class Usuarios {

  titulo = input<string>('');
  private readonly usuariosService = inject(UsuariosService)
  protected readonly usuarios = this.usuariosService.usuarios;
  protected readonly usuariosApi = signal<Iusuarios[]>([])


  protected readonly cantidadUsuarios = computed(() => this.usuariosService.usuarios().length);
  cambioSolicitado = output<void>();

  protected readonly cantidadCandidatos = computed(() => this.usuariosService.usuarios().filter(usuario => usuario.tipo_usuario === "Candidato").length)

  protected readonly cantidadEmpresas = computed(() => this.usuariosService.usuarios().filter(usuario => usuario.tipo_usuario === "Empresa").length)


  protected readonly nuevoNombre = signal<string>('')
  protected readonly nuevoEmail = signal<string>('')
  protected readonly tipoUsuario = signal<string>('')

  protected readonly datosCompletos = computed(() => {
    if (this.nuevoNombre().trim() === "" || this.nuevoEmail().trim() === "" || !this.nuevoEmail().includes("@") || this.tipoUsuario() === "") {
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
    if (!this.datosCompletos()) {
      return;
    }
    const respuestaService = this.usuariosService.crearUsuarioService(
      this.nuevoNombre(),
      this.nuevoEmail(),
      this.tipoUsuario()
    );

    if(respuestaService){
      this.nuevoNombre.set('');
      this.nuevoEmail.set('');
      this.tipoUsuario.set('');
    }
  }

  public eliminarUsuario(id: number): void {
    this.usuariosService.eliminarUsuarioService(id);

  }

  public modificarNombreUsuario(id: number, nombreEnviado: string): void {
    this.usuariosService.modificarNombreUsuarioService(id, nombreEnviado)
    this.nuevoNombre.set('')
  }

  public consultarUsuariosApi(): void {
    this.usuariosService.obtenerUsuariosApi().subscribe({
      next: (usuarios) =>{
        console.log("usuarios api: ", usuarios);
        this.usuariosApi.set(usuarios);
      },
      error: (error) => {
        console.error("Error al consultar Api", error)
      }
    })
  }

}

