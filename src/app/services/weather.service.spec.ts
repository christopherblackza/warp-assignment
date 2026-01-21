import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WeatherService } from './weather.service';
import { environment } from '../../environments/environment';
import { API_ENDPOINTS } from '../../constants/api-endpoints';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService]
    });
    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch weather data successfully', () => {
    const mockWeather = {
      city: 'Cape Town',
      temp: 22,
      condition: 'Clear',
      description: 'clear sky',
      icon: 'icon.png',
      unit: 'metric' as const
    };

    service.getWeather('Cape Town', 'metric').subscribe(data => {
      expect(data).toEqual(mockWeather);
    });

    const req = httpMock.expectOne(req => 
      req.url === 'http://localhost:3000/api/weather' && 
      req.params.get('city') === 'Cape Town' &&
      req.params.get('units') === 'metric'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockWeather);
  });

  it('should handle 404 error (City Not Found)', () => {
    service.getWeather('UnknownCity', 'metric').subscribe({
      next: () => fail('Should have failed with 404 error'),
      error: (error) => {
        expect(error.message).toContain('City not found');
      }
    });

    const req = httpMock.expectOne(req => 
      req.url === 'http://localhost:3000/api/weather' && 
      req.params.get('city') === 'UnknownCity'
    );
    req.flush('City not found', { status: 404, statusText: 'Not Found' });
  });

  it('should handle 500 error (Server Error)', () => {
    service.getWeather('Cape Town', 'metric').subscribe({
      next: () => fail('Should have failed with 500 error'),
      error: (error) => {
        expect(error.message).toContain('Something went wrong fetching weather');
      }
    });

    const req = httpMock.expectOne(req => 
      req.url === 'http://localhost:3000/api/weather' && 
      req.params.get('city') === 'Cape Town'
    );
    req.flush('Server Error', { status: 500, statusText: 'Internal Server Error' });
  });

  it('should use provided units when specified', () => {
    const mockWeather = {
      city: 'Johannesburg',
      temp: 25,
      condition: 'Partly Cloudy',
      description: 'partly cloudy',
      icon: 'icon.png',
      unit: 'metric' as const
    };

    service.getWeather('Johannesburg', 'metric').subscribe(data => {
      expect(data).toEqual(mockWeather);
    });

    const req = httpMock.expectOne(req => 
      req.url === environment.apiUrl + API_ENDPOINTS.WEATHER && 
      req.params.get('city') === 'Johannesburg' &&
      req.params.get('units') === 'metric'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockWeather);
  });
});
