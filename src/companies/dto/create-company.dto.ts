import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateCompanyDto {
  @IsNotEmpty({
    message: 'Email is not empty',
  })
  name: string;

  @IsNotEmpty({
    message: 'Address is not empty',
  })
  address: string;

  @IsNotEmpty({
    message: 'Description is not empty',
  })
  description: string;
}
