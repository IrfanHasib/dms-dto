import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AuthResponseDTO {
  @IsNotEmpty()
  @IsString()
  accessToken: string;

  @IsNotEmpty()
  @IsString()
  expiresIn: string;

  @IsNotEmpty()
  @IsString()
  tokenType: string;

  @IsOptional()
  @IsString()
  message?: string;
}
