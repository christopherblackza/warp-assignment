import { WeatherData } from "../../../app/interfaces/weather.interface";

export interface WeatherState {
  data: WeatherData | null;
  loading: boolean;
  error: string | null;
}

export const initialWeatherState: WeatherState = {
  data: null,
  loading: false,
  error: null
};
