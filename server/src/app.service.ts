import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

export interface WeatherData {
  city: string;
  temp: number;
  condition: string;
  description: string;
  icon: string;
  unit: 'metric' | 'imperial';
}

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}


  async getWeather(city: string, units: 'metric' | 'imperial' = 'metric'): Promise<WeatherData> {
    const apiKey = this.configService.get<string>('OPENWEATHER_API_KEY');
    if (!apiKey) {
      throw new HttpException('API Key not configured', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    try {
      const baseUrl = this.configService.get<string>('OPEN_WEATHER_BASE_URL');
      const url = `${baseUrl}/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
      const response = await axios.get(url);
      const data = response.data;

      return {
        city: data.name,
        temp: data.main.temp,
        condition: data.weather[0].main,
        description: data.weather[0].description,
        icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        unit: units
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          throw new HttpException('City not found', HttpStatus.NOT_FOUND);
        }
        throw new HttpException(
          error.response?.data?.message || 'Error fetching weather data',
          error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
