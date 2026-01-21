import { createReducer, on } from '@ngrx/store';
import { initialWeatherState } from '../models/weather.state';
import * as WeatherActions from '../actions/weather.actions';

export const weatherReducer = createReducer(
  initialWeatherState,
  on(WeatherActions.loadWeather, (state) => ({
    ...state,
    loading: true,
    error: null,
    data: null
  })),
  on(WeatherActions.loadWeatherSuccess, (state, { weather }) => ({
    ...state,
    loading: false,
    data: weather,
    error: null
  })),
  on(WeatherActions.loadWeatherFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
