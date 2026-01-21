import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export abstract class BaseService {
  #CLASS_NAME = 'BaseService';

  constructor(
    protected http: HttpClient,
    protected baseUrl: string,
  ) {}

  /**
   * Perform a GET request.
   * @param endpoint The API endpoint to append to the base URL.
   * @param params Optional query parameters.
   * @param headers Optional HTTP headers.
   */
  protected get<T>(endpoint: string, params?: any, headers?: HttpHeaders): Observable<T> {
    const httpParams = this.createParams(params);
    return this.http
      .get<T>(`${this.baseUrl}${endpoint}`, { params: httpParams, headers })
      .pipe(catchError((error) => this.handleError(error)));
  }

  /**
   * Perform a POST request.
   * @param endpoint The API endpoint to append to the base URL.
   * @param data The body of the request.
   * @param headers Optional HTTP headers.
   */
  protected post<T>(endpoint: string, data: any, headers?: HttpHeaders): Observable<T> {
    return this.http
      .post<T>(`${this.baseUrl}${endpoint}`, data, { headers })
      .pipe(catchError((error) => this.handleError(error)));
  }

  /**
   * Perform a PUT request.
   * @param endpoint The API endpoint to append to the base URL.
   * @param data The body of the request.
   * @param headers Optional HTTP headers.
   */
  protected put<T>(endpoint: string, data: any, headers?: HttpHeaders): Observable<T> {
    return this.http
      .put<T>(`${this.baseUrl}${endpoint}`, data, { headers })
      .pipe(catchError((error) => this.handleError(error)));
  }

  /**
   * Perform a DELETE request.
   * @param endpoint The API endpoint to append to the base URL.
   * @param params Optional query parameters.
   * @param headers Optional HTTP headers.
   */
  protected delete<T>(endpoint: string, params?: any, headers?: HttpHeaders): Observable<T> {
    const httpParams = this.createParams(params);
    return this.http
      .delete<T>(`${this.baseUrl}${endpoint}`, { params: httpParams, headers })
      .pipe(catchError((error) => this.handleError(error)));
  }

  /**
   * Standard error handling. Can be overridden by child classes.
   * @param error The HttpErrorResponse object.
   */
  protected handleError(error: HttpErrorResponse): Observable<never> {
    console.error(`${this.#CLASS_NAME}.handleError() - error: `, error);
    return throwError(() => error);
  }

  /**
   * Helper to create HttpParams from a plain object.
   * @param params Plain object representing query parameters.
   */
  private createParams(params: any): HttpParams {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach((key) => {
        if (params[key] !== undefined && params[key] !== null) {
          httpParams = httpParams.set(key, params[key]);
        }
      });
    }
    return httpParams;
  }
}
