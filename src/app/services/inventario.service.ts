import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { GLOBAL } from './global';
import {Property} from '../Models/Property';
import { map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  public backendUrl: string;
  public propertiesUrl:string;
  public deleteUsersUrl:string;

  constructor(private http: HttpClient) {
    this.backendUrl = GLOBAL.backendUrl;
    this.propertiesUrl = `${this.backendUrl}/usuarios/propiedades/2`;
    this.deleteUsersUrl = this.backendUrl + '/usuarios/propiedad/';
  }

  getProperties(): Observable<Property[]>{
    return this.http.get<Property[]>(this.propertiesUrl);
  }

  public getProperty(id): Observable<Property> {
    const getUserUrl = this.deleteUsersUrl+ id;
    return this.http.get<Property>(getUserUrl).pipe(catchError(this.erroHandler));
  }

  getPropertiesHardcoded() {
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
      }
    ];
  }

  register(property: Property){
    console.log("====property")
    console.log(property)
    const base = this.http.post(this.propertiesUrl, property);
    const request = base.pipe(
        map((data: any) => {
            return data;
        })
    );
    return request;
  }

  public editProperty(id,property): Observable<Property> {
    const getPropertyUrl = this.deleteUsersUrl + id;
    return this.http.put<Property>(getPropertyUrl, property).pipe(catchError(this.erroHandler));
  }


  delete(id: string, companyId){
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        propId: id,
        companyId,
      },
    };
    const base = this.http.delete(this.deleteUsersUrl + id, options);
    const request = base.pipe(
        map((data: any) => {
            return data;
        })
    );
    return request;
  }

  erroHandler(error: HttpErrorResponse) {
    console.error('An error occurred:', error.error);
    return throwError(error.message || 'server Error');
  }

}
