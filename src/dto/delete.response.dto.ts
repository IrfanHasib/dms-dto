import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DeleteResponseDto {
  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  deletedId: number;

  @IsNotEmpty()
  @IsBoolean()
  isDeleted: boolean;
}
