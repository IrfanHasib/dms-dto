import { IsBoolean, IsDate, IsInt, IsNotEmpty, IsNumber } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { decorate } from 'ts-mixer';
import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export class BaseDBFieldsDto {
  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsNumber())
  @decorate(IsInt())
  @decorate(PrimaryGeneratedColumn())
  id: number;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsBoolean())
  @decorate(
    Column({
      nullable: false,
      default: false,
      type: 'boolean',
    }),
  )
  isDeleted: boolean;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsDate())
  @decorate(Type(() => Date))
  @decorate(CreateDateColumn())
  createdAt: Date;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsDate())
  @decorate(Type(() => Date))
  @decorate(UpdateDateColumn())
  updatedAt: Date;
}
