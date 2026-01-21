import { WeatherState } from '../models/weather.state';
import * as WeatherSelectors from './weather.selectors';

describe('Weather Selectors', () => {
  const initialState: WeatherState = {
    data: {
      city: 'Cape Town',
      temp: 15,
      condition: 'Clouds',
      description: 'scattered clouds',
      icon: 'icon.png',
    },
    loading: false,
    error: null
  };

  it('should select weather data', () => {
    const result = WeatherSelectors.selectWeather.projector(initialState);
    expect(result).toEqual(initialState.data);
  });

  it('should select loading state', () => {
    const result = WeatherSelectors.selectWeatherLoading.projector(initialState);
    expect(result).toBe(false);
  });

  it('should select error state', () => {
    const result = WeatherSelectors.selectWeatherError.projector(initialState);
    expect(result).toBeNull();
  });
});
