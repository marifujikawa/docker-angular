import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Power } from './interfaces/power';
import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })
export class PowerService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  private log(message: string) {
    this.messageService.add(`PowerService: ${message}`);
  }
  private powersUrl = 'http://localhost:5000/api/Powers'; // URL to web api
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** GET powers from the server */
  getPowers(): Observable<Power[]> {
    return this.http.get<Power[]>(this.powersUrl).pipe(
      tap((_) => this.log('fetched powers')),
      catchError(this.handleError<Power[]>('getPowers', []))
    );
  }

  /** GET hero by id. Will 404 if id not found */
  getPower(id: number): Observable<Power> {
    const url = `${this.powersUrl}/${id}`;
    return this.http.get<Power>(url).pipe(
      tap((_) => this.log(`fetched power id=${id}`)),
      catchError(this.handleError<Power>(`getPower id=${id}`))
    );
  }
  /** PUT: update the hero on the server */
  updatePower(power: Power): Observable<any> {
    return this.http.put(this.powersUrl+"/"+power.id, power, this.httpOptions).pipe(
      tap((_) => this.log(`updated power id=${power.id}`)),
      catchError(this.handleError<any>('updatePower'))
    );
  }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  /** POST: add a new hero to the server */
  addPower(power: Power): Observable<Power> {
    return this.http.post<Power>(this.powersUrl, power, this.httpOptions).pipe(
      tap((newPower: Power) => this.log(`added power w/ id=${newPower.id}`)),
      catchError(this.handleError<Power>('addPower'))
    );
  }
  /** DELETE: delete the hero from the server */
  deletePower(id: number): Observable<Power> {
    const url = `${this.powersUrl}/${id}`;

    return this.http.delete<Power>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted power id=${id}`)),
      catchError(this.handleError<Power>('deletePower'))
    );
  }
  /* GET powers whose name contains search term */
  searchPowers(term: string): Observable<Power[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Power[]>(`${this.powersUrl}/?name=${term}`).pipe(
      tap((x) =>
        x.length
          ? this.log(`found powers matching "${term}"`)
          : this.log(`no powers matching "${term}"`)
      ),
      catchError(this.handleError<Power[]>('searchPowers', []))
    );
  }
}
