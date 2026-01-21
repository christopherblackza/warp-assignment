import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { WeatherComponent } from './weather.component';
import { WeatherService } from '../../services/weather.service';
import { of, throwError, timer } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';
import { By } from '@angular/platform-browser';

describe('WeatherComponent', () => {
  let component: WeatherComponent;
  let fixture: ComponentFixture<WeatherComponent>;
  let weatherServiceMock: any;

  beforeEach(async () => {
    weatherServiceMock = {
      getWeather: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [WeatherComponent, ReactiveFormsModule],
      providers: [
        { provide: WeatherService, useValue: weatherServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty city', () => {
    expect(component.weatherForm.get('city')?.value).toBe('');
  });

  it('should validate required city', () => {
    const cityControl = component.weatherForm.get('city');
    cityControl?.setValue('');
    expect(cityControl?.valid).toBeFalsy();
    expect(cityControl?.errors?.['required']).toBeTruthy();
  });

  it('should_validate_whitespace_city', () => {
    const cityControl = component.weatherForm.get('city');
    cityControl?.setValue('   ');
    expect(cityControl?.valid).toBeFalsy();
  });

  it('should call weather service and display data when form valid', fakeAsync(() => {
    const mockWeather = {
      city: 'Paris',
      temp: 20,
      condition: 'Clear',
      description: 'clear sky',
      icon: 'icon.png',
      unit: 'metric'
    };
    weatherServiceMock.getWeather.mockReturnValue(of(mockWeather).pipe(delay(100)));

    component.weatherForm.setValue({ city: 'Paris' });
    component.onSubmit();

    expect(component.loading()).toBe(true);
    tick(100); // Wait for observable
    expect(component.loading()).toBe(false);
    expect(component.weather()).toEqual(mockWeather);
    expect(component.error()).toBeNull();
    
    fixture.detectChanges();
    const cityDisplay = fixture.debugElement.query(By.css('h3'));
    expect(cityDisplay.nativeElement.textContent).toContain('Paris');
    const conditionDisplay = fixture.debugElement.query(By.css('.lead'));
    expect(conditionDisplay.nativeElement.textContent).toContain('Clear');
  }));

  it('should display error when service fails', fakeAsync(() => {
    const errorMessage = 'City not found';
    weatherServiceMock.getWeather.mockReturnValue(
      timer(100).pipe(switchMap(() => throwError(() => new Error(errorMessage))))
    );

    component.weatherForm.setValue({ city: 'Unknown' });
    component.onSubmit();

    expect(component.loading()).toBe(true);
    tick(100);
    expect(component.loading()).toBe(false);
    expect(component.weather()).toBeNull();
    expect(component.error()).toBe(errorMessage);

    fixture.detectChanges();
    const errorAlert = fixture.debugElement.query(By.css('.alert-danger'));
    expect(errorAlert.nativeElement.textContent).toContain(errorMessage);
  }));

  it('should not call service if form invalid', () => {
    component.weatherForm.setValue({ city: '' });
    component.onSubmit();
    expect(weatherServiceMock.getWeather).not.toHaveBeenCalled();
  });
});
