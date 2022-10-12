import { IsNotEmpty, IsNumber } from 'class-validator';

export class DiscountListItemDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
