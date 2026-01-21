import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WeatherState } from '../models/weather.state';

export const selectWeatherState = createFeatureSelector<WeatherState>('weather');

export const selectWeather = createSelector(
  selectWeatherState,
  (state) => state.data
);

export const selectWeatherLoading = createSelector(
  selectWeatherState,
  (state) => state.loading
);

export const selectWeatherError = createSelector(
  selectWeatherState,
  (state) => state.error
);
