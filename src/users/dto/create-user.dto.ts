import { Type } from 'class-transformer';
import {
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

class Company {
  @IsNotEmpty()
  _id: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty()
  name: string;
}

export class CreateUserDto {
  @IsNotEmpty({
    message: 'Name is not empty',
  })
  name: string;

  @IsEmail(
    {},
    {
      message: 'Email not is valid',
    },
  )
  @IsNotEmpty({
    message: 'Email is not empty',
  })
  email: string;

  @IsNotEmpty({
    message: 'Password is not empty',
  })
  password: string;

  @IsNotEmpty({
    message: 'Age is not empty',
  })
  age: number;

  @IsNotEmpty({
    message: 'Gender is not empty',
  })
  gender: string;

  @IsNotEmpty({
    message: 'Address is not empty',
  })
  address: string;

  @IsNotEmpty({
    message: 'Role is not empty',
  })
  @IsMongoId({ message: 'Role id is mongo id' })
  role: mongoose.Schema.Types.ObjectId;

  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => Company)
  company: Company;
}

export class RegisterUserDto {
  @IsNotEmpty({
    message: 'Name is not empty',
  })
  name: string;

  @IsEmail(
    {},
    {
      message: 'Email not is valid',
    },
  )
  @IsNotEmpty({
    message: 'Email is not empty',
  })
  email: string;

  @IsNotEmpty({
    message: 'Password is not empty',
  })
  password: string;

  @IsNotEmpty({
    message: 'Age is not empty',
  })
  age: number;

  @IsNotEmpty({
    message: 'Gender is not empty',
  })
  gender: string;

  @IsNotEmpty({
    message: 'Address is not empty',
  })
  address: string;
}

export class UserLoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'hoidanit@gmail.com', description: 'username' })
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '123456',
    description: 'password',
  })
  readonly password: string;
}
