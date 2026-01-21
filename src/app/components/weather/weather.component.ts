import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WeatherService } from '../../services/weather.service';
import { finalize } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { WeatherData } from '../../interfaces/weather.interface';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent {
  #CLASS_NAME = 'WeatherComponent';

  weatherForm: FormGroup;
  weather = signal<WeatherData | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);

  constructor(
    private fb: FormBuilder,
    private weatherService: WeatherService,
  ) {
    // Initialize form with validation: required and non-whitespace patterns
    this.weatherForm = this.fb.group({
      city: ['', [Validators.required, Validators.pattern(/^(?!\s*$).+/)]], // Non-empty, non-whitespace
    });
  }

  onSubmit() {
    if (this.weatherForm.invalid) {
      return;
    }

    // Sanitize input to remove leading/trailing whitespace
    const city = this.weatherForm.get('city')?.value.trim();
    if (!city) return;

    // Reset UI states before initiating new request
    this.loading.set(true);
    this.error.set(null);
    this.weather.set(null);

    // Retrieve unit preference (currently static from environment)
    const units = (environment.temperatureUnit as 'metric' | 'imperial') || 'metric';

    this.weatherService
      .getWeather(city, units)
      .pipe(finalize(() => this.loading.set(false))) // Ensure loading state is reset regardless of success/error
      .subscribe({
        next: (data) => {
          this.weather.set(data);

          // Reset form input after successful search
          this.weatherForm.get('city')?.setValue('');
        },
        error: (err) => {
          console.error(`${this.#CLASS_NAME}.onSubmit() - error: `, err);

          this.error.set(err.message);
        },
      });
  }
}
