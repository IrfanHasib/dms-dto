import 'reflect-metadata';
import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class PaginateResponseMetadataDto {
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  itemCount: number;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  totalItems: number;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  itemsPerPage: number;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  totalPages: number;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  currentPage: number;
}
