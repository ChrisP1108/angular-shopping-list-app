import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class HttpService {

  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse): Observable<any> {
    let errorMessage = 'Unknown Error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => errorMessage);
  }

  get(url: string): Observable<any[]> {
    return this.http.get<any[]>(url)
      .pipe(catchError(this.handleError))
    ;
  }

  post(url: string, data: object): Observable<object> {
    return this.http.post<object>(url, data, httpOptions)
      .pipe(catchError(this.handleError))
    ;
  }

  put(url: string, data: any): Observable<object> {
    const putUrl = `${url}/${data._id}`;
    return this.http.put<object>(putUrl, data, httpOptions)
      .pipe(catchError(this.handleError))
    ;
  }

  delete(url: string, data: any): Observable<object> {
    const delUrl = `${url}/${data._id}`;
    return this.http.delete<object>(delUrl)
      .pipe(catchError(this.handleError))
    ;
  }
}
