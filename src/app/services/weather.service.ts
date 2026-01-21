import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ApiErrorCode, ApiErrorMessages } from '../../constants/api-error-codes';
import { BaseService } from './base.service';
import { WeatherData } from '../interfaces/weather.interface';
import { API_ENDPOINTS } from '../../constants/api-endpoints';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService extends BaseService {
  #CLASS_NAME = 'WeatherService';

  constructor(http: HttpClient) {
    super(http, environment.apiUrl + API_ENDPOINTS.WEATHER);
  }

  /**
   * Fetches current weather data for a specific city.
   * @param city The name of the city.
   * @param units The temperature unit ('metric' or 'imperial').
   * @returns Observable containing weather data.
   */
  getWeather(city: string, units: 'metric' | 'imperial'): Observable<WeatherData> {
    return this.get<WeatherData>('', { city, units });
  }

  /**
   * Handles API errors specifically for weather service.
   * @param error The HttpErrorResponse object.
   */
  protected override handleError(error: HttpErrorResponse): Observable<never> {
    console.error(`${this.#CLASS_NAME}.handleError() - error: `, error);
    let errorCode = ApiErrorCode.UNKNOWN_ERROR;

    if (error.status === 404) {
      errorCode = ApiErrorCode.CITY_NOT_FOUND;
    } else if (error.status >= 500) {
      errorCode = ApiErrorCode.SERVER_ERROR;
    }

    const errorMessage = ApiErrorMessages[errorCode];
    return throwError(() => new Error(errorMessage));
  }
}
