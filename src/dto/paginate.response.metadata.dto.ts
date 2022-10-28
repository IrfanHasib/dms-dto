import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';
import { Expose } from 'class-transformer';

export class PaginateResponseMetadataDto {
  @Expose()
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  itemCount: number;

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  totalItems: number;

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  itemsPerPage: number;

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  totalPages: number;

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  currentPage: number;
}
