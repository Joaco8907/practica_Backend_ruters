import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Usuarios } from './components/usuarios/usuarios';

@Component({
  imports: [RouterOutlet,Usuarios],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})

export class App {
  protected readonly title = signal('CVMatch');
  usuarioSeleccionado = signal<number | null>(null);

  public cambiarTitulo(){
    if(this.title() === "CVMatch"){
      this.title.set("Gestion de usuarios")
    }else{
      this.title.set("CVMatch")
    }
  }

  mostrarUsuario(id: number){
    console.log(`El componente padre recibió el usuario: ${id}`);
    this.usuarioSeleccionado.set(id);
  }

}