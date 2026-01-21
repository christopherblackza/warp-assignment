import { IsString, IsNotEmpty, IsIn, IsOptional } from 'class-validator';

export class GetWeatherDto {
  @IsString()
  @IsNotEmpty()
  city: string;

  @IsOptional()
  @IsIn(['metric', 'imperial'])
  units?: 'metric' | 'imperial' = 'metric';
}
