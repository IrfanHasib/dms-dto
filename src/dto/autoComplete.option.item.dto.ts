import { Allow, IsNotEmpty, IsNumber } from 'class-validator';
import 'reflect-metadata';

export class AutoCompleteOptionItemDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @Allow()
  label: string;
}
