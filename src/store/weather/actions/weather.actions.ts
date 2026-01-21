import { createAction, props } from '@ngrx/store';
import { WeatherData } from '../../../app/interfaces/weather.interface';

export const loadWeather = createAction(
  '[Weather] Load Weather',
  props<{ city: string; unit: 'metric' | 'imperial' }>()
);

export const loadWeatherSuccess = createAction(
  '[Weather] Load Weather Success',
  props<{ weather: WeatherData }>()
);

export const loadWeatherFailure = createAction(
  '[Weather] Load Weather Failure',
  props<{ error: string }>()
);
