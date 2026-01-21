import { weatherReducer } from './weather.reducer';
import * as WeatherActions from '../actions/weather.actions';
import { initialWeatherState } from '../models/weather.state';

describe('Weather Reducer', () => {
  it('should return the initial state', () => {
    const action = { type: 'Unknown' };
    const state = weatherReducer(initialWeatherState, action);
    expect(state).toBe(initialWeatherState);
  });

  it('should set loading to true on loadWeather', () => {
    const action = WeatherActions.loadWeather({ city: 'Cape Town', unit: 'metric' });
    const state = weatherReducer(initialWeatherState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
    expect(state.data).toBeNull();
  });

  it('should update state on loadWeatherSuccess', () => {
    const mockWeather = {
      city: 'Cape Town',
      temp: 15,
      condition: 'Clouds',
      description: 'scattered clouds',
      icon: 'icon.png',
      unit: 'metric' as const
    };
    const action = WeatherActions.loadWeatherSuccess({ weather: mockWeather });
    const state = weatherReducer({ ...initialWeatherState, loading: true }, action);
    expect(state.loading).toBe(false);
    expect(state.data).toEqual(mockWeather);
    expect(state.error).toBeNull();
  });

  it('should update state on loadWeatherFailure', () => {
    const error = 'Error message';
    const action = WeatherActions.loadWeatherFailure({ error });
    const state = weatherReducer({ ...initialWeatherState, loading: true }, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(error);
  });
});
