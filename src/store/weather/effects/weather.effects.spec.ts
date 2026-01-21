import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { WeatherEffects } from './weather.effects';
import { WeatherService } from '../../../app/services/weather.service';
import * as WeatherActions from '../actions/weather.actions';

describe('WeatherEffects', () => {
  let actions$: Observable<any>;
  let effects: WeatherEffects;
  let weatherServiceSpy: any;

  beforeEach(() => {
    weatherServiceSpy = {
      getWeather: jest.fn()
    };
    
    // Actions must be an observable before injection
    actions$ = of(null);

    TestBed.configureTestingModule({
      providers: [
        WeatherEffects,
        provideMockActions(() => actions$),
        { provide: WeatherService, useValue: weatherServiceSpy }
      ]
    });

    effects = TestBed.inject(WeatherEffects);
  });

  it('should return loadWeatherSuccess on success', (done) => {
    const mockWeather = {
      city: 'Cape Town',
      temp: 15,
      condition: 'Clouds',
      description: 'scattered clouds',
      icon: 'icon.png',
      unit: 'metric' as const
    };
    
    actions$ = of(WeatherActions.loadWeather({ city: 'Cape Town', unit: 'metric' }));
    weatherServiceSpy.getWeather.mockReturnValue(of(mockWeather));

    effects.loadWeather$.subscribe(action => {
      expect(weatherServiceSpy.getWeather).toHaveBeenCalledWith('Cape Town', 'metric');
      expect(action).toEqual(WeatherActions.loadWeatherSuccess({ weather: mockWeather }));
      done();
    });
  });

  it('should return loadWeatherFailure on error', (done) => {
    const error = 'Error message';
    
    actions$ = of(WeatherActions.loadWeather({ city: 'Cape Town', unit: 'metric' }));
    weatherServiceSpy.getWeather.mockReturnValue(throwError(() => new Error(error)));

    effects.loadWeather$.subscribe(action => {
      expect(weatherServiceSpy.getWeather).toHaveBeenCalledWith('Cape Town', 'metric');
      expect(action).toEqual(WeatherActions.loadWeatherFailure({ error }));
      done();
    });
  });
});
