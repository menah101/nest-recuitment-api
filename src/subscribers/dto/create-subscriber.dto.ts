import { IsArray, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateSubscriberDto {
  @IsNotEmpty({ message: 'name not is empty' })
  name: string;

  @IsNotEmpty({ message: 'email not is empty' })
  @IsEmail({}, { message: 'email not is valid' })
  email: string;

  @IsNotEmpty({ message: 'skills not is empty' })
  @IsArray({ message: 'skills is array' })
  @IsString({ each: true, message: 'email not is valid' })
  skills: string[];
}
