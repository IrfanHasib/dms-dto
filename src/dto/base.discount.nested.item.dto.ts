import { IsNotEmpty, IsNumber } from 'class-validator';

export class BaseDiscountNestedItemDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
