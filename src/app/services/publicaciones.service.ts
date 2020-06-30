import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { GLOBAL } from './global';
import {PublishedProperty} from '../Models/PublishedProperty';
import {PublishedUser} from '../Models/PublishedUser';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PublicacionesService {
  public backendUrl: string;
  public propertiesUrl:string;
  public deleteUsersUrl:string;

  constructor(private http: HttpClient) { 
    this.backendUrl = GLOBAL.backendUrl;
  }

  getSellers(companyId,propId):Observable<PublishedUser[]>{
    let criteria= {
      propId,
      companyId
    };
    
    let publishersUrl=this.backendUrl + '/publish/sellers/' + encodeURIComponent( JSON.stringify(criteria)) ;
    console.log(publishersUrl)
    return this.http.get<PublishedUser[]>(publishersUrl).pipe(catchError(this.erroHandler));
  }

  getPublishedProperties(companyId):Observable<PublishedProperty[]>{
    console.log(companyId)
    let publishedPropertiesUrl=this.backendUrl + '/publish/properties/' + companyId ;
    return this.http.get<PublishedProperty[]>(publishedPropertiesUrl).pipe(catchError(this.erroHandler));
  }

  publishProperties(sellers){
    console.log(sellers)
    let publishedPropertiesUrl=this.backendUrl + '/publish/properties/' ;
    const base = this.http.post(publishedPropertiesUrl, sellers);
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
