import { Controller, Get, Query } from '@nestjs/common';
import { AppService, WeatherData } from './app.service';
import { GetWeatherDto } from './dto/get-weather.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('api/weather')
  async getWeather(@Query() query: GetWeatherDto): Promise<WeatherData> {
    const { city, units } = query;
    return this.appService.getWeather(city, units || 'metric');
  }
}
