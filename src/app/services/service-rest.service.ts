import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Zoologico } from '../clases/zoologico';

@Injectable({
  providedIn: 'root'
})
export class ServiceRestService {

  http = inject(HttpClient);

  URL: string = 'http://localhost:3300';
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }),
  };
  
  //=========GET LISTA ZOO============
  getZooList(): Observable<Zoologico[]>{
    return this.http.get<Zoologico[]>(`${this.URL}/zoologicos/`).pipe(
      tap((Zoologico)=> console.log('Zoologicos obtenidos')),
      catchError(this.handleError<Zoologico[]>('Get Zoologico', [])) 
    );
  }

  //=========CREAR ZOOLOGICO============
  addZoo(zoo: Zoologico): Observable<any> {
    return this.http
      .post<Zoologico>(`${this.URL}/zoologicos/`, zoo, this.httpHeader)
      .pipe(catchError(this.handleError<Zoologico>('Add zoologico')));
  }

  //=========EDITAR ZOOLOGICO POR ID============
  updateZoo(id: any, zoo: Zoologico): Observable<any> {
    return this.http.put(`${this.URL}/zoologicos/` + id, zoo,
      this.httpHeader).pipe(
        tap((_) => console.log(`Zoologico updated: ${id}`)),
        catchError(this.handleError<Zoologico[]>('Update Zoologico'))
      );
  }  

  //=========BORRAR ZOOLOGICO============
  deleteZoo(id: any): Observable<Zoologico[]> {
    return this.http.delete<Zoologico[]>(`${this.URL}/zoologicos/` + id,
      this.httpHeader).pipe(
        tap((_) => console.log(`Zoologico deleted: ${id}`)),
        catchError(this.handleError<Zoologico[]>('Delete Zoologico'))
      );
  }  

  //=====GET ZOOLOGICO POR ID========
  getZooId(id: any): Observable<Zoologico[]> {
    return this.http.get<Zoologico[]>(`${this.URL}/zoologicos/` + id).pipe(
      tap((_) => console.log(`Zoologico fetched: ${id}`)),
      catchError(this.handleError<Zoologico[]>(`Get Zoologico id=${id}`))
    );
  }




  //funcion para manejar errores
  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.log(error);
      console.log(`${operation} failed: ${error.message}`);
      return of (result as T);
    };
  }

}
