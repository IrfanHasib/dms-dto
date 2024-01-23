import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class CreatedResponseDto {
  @Expose()
  @IsOptional()
  @IsString()
  message?: string;

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  id: number;
}
