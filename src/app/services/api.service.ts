import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs-compat/Observable';

@Injectable()
export class ApiService {
  CHARGE_URL = 'https://us-central1-lottery-f4218.cloudfunctions.net/charge';
  USER_URL = 'https://us-central1-lottery-f4218.cloudfunctions.net/createUser';
  // TEST_URL = 'https://us-central1-lottery-f4218.cloudfunctions.net/collectHistoricalDrawingResults';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor (private http: HttpClient) {}

  // getTest(): Observable<any> {
  //   return this.http.get(this.TEST_URL);
  // }

  postNewUser(body): Observable<any> {
    console.log('POST');
    return this.http.post<any>(this.USER_URL, JSON.stringify(body), this.httpOptions).pipe(
      tap((res) => console.log('received post', res)),
      catchError(this.handleError<any>('postTest Error'))
    );
  }

  postCharge(token): Observable<any> {
    return this.http.post<any>(this.CHARGE_URL, JSON.stringify(token), this.httpOptions).pipe(
      tap((res) => console.log('received post', res)),
      catchError(this.handleError<any>('postCharge Error'))
    );
  }

  handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // Error logging
      console.error(`ERROR HANDLER ${operation}`, error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
