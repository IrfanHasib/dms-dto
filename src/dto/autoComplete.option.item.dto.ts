import { Allow, IsNotEmpty, IsNumber } from 'class-validator';
import { Expose } from 'class-transformer';

export class AutoCompleteOptionItemDto {
  @Expose()
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @Expose()
  @Allow()
  label: string;
}
