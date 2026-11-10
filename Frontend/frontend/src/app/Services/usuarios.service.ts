import { Injectable, signal, inject } from '@angular/core';
import { Iusuarios } from '../models/Iusuarios';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UsuariosService {
    private readonly http = inject(HttpClient)
    private readonly _usuarios = signal<Iusuarios[]>([{
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

    
    private readonly ultimoID = signal(
        Math.max(0, ...this._usuarios().map(usuario => usuario.id))
    );

    public readonly usuarios = this._usuarios.asReadonly()




    public crearUsuarioService(nuevoNombre: string, nuevoEmail: string,
        tipoUsuario: string): boolean {
        const partesEmail = nuevoEmail.split("@")
        if (partesEmail.length !== 2 ||
            partesEmail[0].trim().length === 0 ||
            partesEmail[1].trim().length === 0) {
            return false
        }
        let datosCompletos = false
        if (nuevoNombre.trim() !== "" && nuevoEmail.trim() !== "" && tipoUsuario !== "") {
            datosCompletos = true;
        }
        if (!datosCompletos) {
            return false;
        }
        this.ultimoID.update(valor => valor + 1);
        const nuevoId = this.ultimoID()
        const nuevoUsuario: Iusuarios = {
            id: nuevoId,
            nombre: nuevoNombre.trim(),
            email: nuevoEmail.trim(),
            tipo_usuario: tipoUsuario,
            fecha_registro: "2026-10-05T09:10:44"
        };
        this._usuarios.update((usuarios) => [...usuarios, nuevoUsuario]);
        return true
    }

    public eliminarUsuarioService(id: number): void {
        this._usuarios.update(usuarios => usuarios.filter(usuario => usuario.id !== id))
    }

    public modificarNombreUsuarioService(id: number, nombreEnviado: string): void {
        if (nombreEnviado.trim() === "") {
            return;
        }
        const nombre = nombreEnviado
            .trim()
            .split(" ")
            .filter(palabra => palabra !== "")
            .join(" ")


        this._usuarios.update(usuarioActual => {
            return usuarioActual.map(usuario => {
                if (usuario.id === id) {

                    return { ...usuario, nombre }
                }
                return usuario
            })
        })
        //
    }

    public obtenerUsuariosApi () {
        return this.http.get<Iusuarios[]>(
            'http://localhost:3000/api/usuarios'
        )
    }


}

