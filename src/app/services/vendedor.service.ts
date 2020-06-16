import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {User} from '../Models/User';
import {UserRegister} from '../Models/UserRegister';
import { map } from 'rxjs/operators';
import { GLOBAL } from './global';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// don't forget this, or you'll get a runtime error

@Injectable({
  providedIn: 'root'
})
export class SellersService {
  public backendUrl: string;
  public usersUrl:string;
  public deleteUsersUrl:string;

  constructor(private http: HttpClient) {
    this.backendUrl = GLOBAL.backendUrl;
    this.usersUrl = `${this.backendUrl}/usuarios/vendedores/1`;
    this.deleteUsersUrl = this.backendUrl + '/usuarios/profile';
  }

  public getUser(id): Observable<User> {
    const getUserUrl = this.deleteUsersUrl + '/' + id;
    console.log('getting user');
    console.log(getUserUrl);
    return this.http.get<User>(getUserUrl).pipe(catchError(this.erroHandler));
  }

  public editUser(id,user): Observable<User> {
    const getUserUrl = this.deleteUsersUrl + '/' + id;
    console.log('Modifying user');
    console.log(getUserUrl);
    return this.http.post<User>(getUserUrl, user).pipe(catchError(this.erroHandler));
  }
  erroHandler(error: HttpErrorResponse) {
    console.error('An error occurred:', error.error);
    return throwError(error.message || 'server Error');
  }

//   public profile(): Observable<any> {
//     return this.http.get(this.url + '/usuarios/profile', {
//         headers: { Authorization: this.getToken() }
//     });
// }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.usersUrl);
  }

  getUsersHardcoded() {
    return [
      {
        usu_id: 1,
        usu_nombre: 'oscar',
        usu_apellido: 'rosete',
        usu_correo: 'oscar.rosete@uabc.edu.mx',
        usu_password: 'oscar',
        usu_fecha_nacimiento: '07/07/1992',
        usu_telefono_personal: '6862645073',
        usu_telefono_oficina: '6862645073',
        usu_pagina_web: 'oscarrosete.com',
        usu_id_rol: 2,
        usu_activo: 1
      },
      {
        usu_id: 2,
        usu_nombre: 'erick',
        usu_apellido: 'rosete',
        usu_correo: 'erick.rosete@uabc.edu.mx',
        usu_password: 'erick',
        usu_fecha_nacimiento: '09/08/1995',
        usu_telefono_personal: '6862645073',
        usu_telefono_oficina: '6862645073',
        usu_pagina_web: 'erickrosete.com',
        usu_id_rol: 2,
        usu_activo: 1
      },
      {
        usu_id: 3,
        usu_nombre: 'oscar2',
        usu_apellido: 'rosete',
        usu_correo: 'oscar.rosete@uabc.edu.mx',
        usu_password: 'oscar',
        usu_fecha_nacimiento: '07/07/1992',
        usu_telefono_personal: '6862645073',
        usu_telefono_oficina: '6862645073',
        usu_pagina_web: 'oscarrosete.com',
        usu_id_rol: 2,
        usu_activo: 1
      },
      {
        usu_id: 4,
        usu_nombre: 'erick2',
        usu_apellido: 'rosete',
        usu_correo: 'erick.rosete@uabc.edu.mx',
        usu_password: 'erick',
        usu_fecha_nacimiento: '09/08/1995',
        usu_telefono_personal: '6862645073',
        usu_telefono_oficina: '6862645073',
        usu_pagina_web: 'erickrosete.com',
        usu_id_rol: 2,
        usu_activo: 1
      },
      {
        usu_id: 5,
        usu_nombre: 'oscar3',
        usu_apellido: 'rosete',
        usu_correo: 'oscar.rosete@uabc.edu.mx',
        usu_password: 'oscar',
        usu_fecha_nacimiento: '07/07/1992',
        usu_telefono_personal: '6862645073',
        usu_telefono_oficina: '6862645073',
        usu_pagina_web: 'oscarrosete.com',
        usu_id_rol: 2,
        usu_activo: 1
      },
      {
        usu_id: 6,
        usu_nombre: 'erick3',
        usu_apellido: 'rosete',
        usu_correo: 'erick.rosete@uabc.edu.mx',
        usu_password: 'erick',
        usu_fecha_nacimiento: '09/08/1995',
        usu_telefono_personal: '6862645073',
        usu_telefono_oficina: '6862645073',
        usu_pagina_web: 'erickrosete.com',
        usu_id_rol: 2,
        usu_activo: 1
      }
    ];
  }

  delete(id: string, companyId){
    const user = {
      usu_id: id
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        userId: id,
        company: companyId,
      },
    };
    const base = this.http.delete(this.deleteUsersUrl + '/' + id, options);
    const request = base.pipe(
        map((data: any) => {
            return data;
        })
    );
    return request;
  }

  register(user: UserRegister){
    console.log(' ====from register service');
    console.log(user);
    const base = this.http.post(this.usersUrl, user);
    // return this.http.get<User[]>(this.usersUrl);

    const request = base.pipe(
        map((data: any) => {
            return data;
        })
    );
    return request;
  }
}
