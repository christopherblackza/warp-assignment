import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService, WeatherData } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            getWeather: jest.fn(),
          },
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });


  describe('getWeather', () => {
    it('should return weather data for a valid city', async () => {
      const result: WeatherData = {
        city: 'Cape Town',
        temp: 15,
        condition: 'Cloudy',
        description: 'scattered clouds',
        icon: 'http://example.com/icon.png',
        unit: 'metric',
      };
      jest.spyOn(appService, 'getWeather').mockResolvedValue(result);

      expect(await appController.getWeather({ city: 'Cape Town' } as any)).toBe(result);
    });

    it('should pass units parameter when provided', async () => {
      const result: WeatherData = {
        city: 'Johannesburg',
        temp: 75,
        condition: 'Sunny',
        description: 'clear sky',
        icon: 'http://example.com/icon.png',
        unit: 'imperial',
      };
      jest.spyOn(appService, 'getWeather').mockResolvedValue(result);

      expect(await appController.getWeather({ city: 'Johannesburg', units: 'imperial' })).toBe(result);
      expect(appService.getWeather).toHaveBeenCalledWith('Johannesburg', 'imperial');
    });

    it('should default to metric units if not provided', async () => {
      const result: WeatherData = {
        city: 'Cape Town',
        temp: 20,
        condition: 'Clear',
        description: 'clear sky',
        icon: 'http://example.com/icon.png',
        unit: 'metric',
      };
      jest.spyOn(appService, 'getWeather').mockResolvedValue(result);

      expect(await appController.getWeather({ city: 'Cape Town' } as any)).toBe(result);
      expect(appService.getWeather).toHaveBeenCalledWith('Cape Town', 'metric');
    });
  });
});
