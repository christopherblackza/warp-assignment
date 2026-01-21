import * as WeatherActions from './weather.actions';

describe('Weather Actions', () => {
  it('should create loadWeather action', () => {
    const action = WeatherActions.loadWeather({ city: 'Cape Town', unit: 'metric' });
    expect(action.type).toBe('[Weather] Load Weather');
    expect(action.city).toBe('Cape Town');
    expect(action.unit).toBe('metric');
  });

  it('should create loadWeatherSuccess action', () => {
    const mockWeather = {
      city: 'Cape Town',
      temp: 15,
      condition: 'Clouds',
      description: 'scattered clouds',
      icon: 'icon.png',
      unit: 'metric' as const
    };
    const action = WeatherActions.loadWeatherSuccess({ weather: mockWeather });
    expect(action.type).toBe('[Weather] Load Weather Success');
    expect(action.weather).toEqual(mockWeather);
  });

  it('should create loadWeatherFailure action', () => {
    const error = 'Error message';
    const action = WeatherActions.loadWeatherFailure({ error });
    expect(action.type).toBe('[Weather] Load Weather Failure');
    expect(action.error).toBe(error);
  });
});
