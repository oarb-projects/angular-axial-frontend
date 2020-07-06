import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router'
import { GLOBAL } from './global';

export interface DetalleUsuario {
    usu_id: number,
    usu_nombre: string,
    usu_apellido: string,
    usu_correo: string,
    usu_password: string,
    exp: number,
    iat: number
}

interface TokenResponse {
    token: string
}

export interface TokenPayload {
    id: number,
    nombre: string,
    apellido: string,
    correo: string,
    password: string,
    nombreCompania: string,
    telefonoPersonal: string,
    telefonoOficina: string,
    paginaWeb: string
}

@Injectable()
export class AuthenticationService {
    private token: string;
    public url: string;

    constructor(private http: HttpClient, private router: Router) { 
        this.url = GLOBAL.url;
    }

    private saveToken(token: string): void {
        localStorage.setItem('usuarioToken', token);
        this.token = token;
    }

    private getToken(): string {
        if(!this.token) {
            this.token = localStorage.getItem('usuarioToken');
        }
        return this.token;
    }

    public getDetalleUsuario(): DetalleUsuario {
        const token = this.getToken();
        let payload;
        
        if(token) {
            payload = token.split('.')[1];
            payload = window.atob(payload);
            return JSON.parse(payload);
        } else {
            return null;
        }
    }

    public isLoggedIn(): boolean {
        const usuario = this.getDetalleUsuario();

        if(usuario) {
            return usuario.exp > Date.now() / 1000;
        } else {
            return false;
        }
    }

    public register(usuario: TokenPayload): Observable<any> {
        const base = this.http.post(this.url + '/usuarios/register', usuario);

        const request = base.pipe(
            map((data: TokenResponse) => {
                if(data.token) {
                    this.saveToken(data.token);
                }
                return data;
            })
        );

        return request;
    }

    public login(usuario: TokenPayload): Observable<any> {
        const base = this.http.post(this.url + '/usuarios/login', usuario);

        const request = base.pipe(
            map((data: TokenResponse) => {
                console.log(data)                
                if(data.token) {
                    this.saveToken(data.token);
                }
                return data;
            })
        );

        return request;
    }

    public profile(): Observable<any> {
        return this.http.get(this.url + '/usuarios/profile', {
            headers: { Authorization: this.getToken() }
        });
    }

    public resendEmail(correo): Observable<any> {
        return this.http.get(this.url + '/usuarios/resend/'+correo, {
            headers: { Authorization: this.getToken() }
        });
    }

    public logout(): void {
        this.token = '';
        window.localStorage.removeItem('usuarioToken');
        this.router.navigateByUrl('/login');
    }
}