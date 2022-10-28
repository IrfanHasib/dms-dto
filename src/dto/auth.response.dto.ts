import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class AuthResponseDTO {
  @Expose()
  @IsNotEmpty()
  @IsString()
  accessToken: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  expiresIn: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  tokenType: string;

  @Expose()
  @IsOptional()
  @IsString()
  message?: string;
}
