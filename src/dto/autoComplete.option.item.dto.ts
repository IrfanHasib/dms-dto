import { Allow, IsNotEmpty, IsNumber } from 'class-validator';

export class AutoCompleteOptionItemDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @Allow()
  label: string;
}
