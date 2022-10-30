import { Allow, IsNotEmpty, IsNumber } from 'class-validator';
import { Expose } from 'class-transformer';
import { decorate } from 'ts-mixer';

export class AutoCompleteOptionItemDto {
  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsNumber())
  id: number;

  @decorate(Expose())
  @decorate(Allow())
  label: string;
}
