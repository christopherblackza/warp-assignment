import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { WeatherService } from '../../../app/services/weather.service';
import * as WeatherActions from '../actions/weather.actions';

@Injectable()
export class WeatherEffects {
  private actions$ = inject(Actions);
  private weatherService = inject(WeatherService);

  loadWeather$ = createEffect(() =>
    this.actions$.pipe(
      // Listen for the 'loadWeather' action
      ofType(WeatherActions.loadWeather),
      // Use switchMap to handle the async API call.
      switchMap(action =>
        this.weatherService.getWeather(action.city, action.unit).pipe(
          // Dispatch success action with data on successful response
          map(weather => WeatherActions.loadWeatherSuccess({ weather })),
          // Dispatch failure action with error message on failure
          catchError(error => of(WeatherActions.loadWeatherFailure({ error: error.message })))
        )
      )
    )
  );
}
