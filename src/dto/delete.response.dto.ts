import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class DeleteResponseDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  message: string;

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  deletedId: number;

  @Expose()
  @IsNotEmpty()
  @IsBoolean()
  isDeleted: boolean;
}
