import { IsNotEmpty } from 'class-validator';

export class CreatePermissionDto {
  @IsNotEmpty({ message: 'Name not is empty' })
  name: string;

  @IsNotEmpty({ message: 'apiPath not is empty' })
  apiPath: string;

  @IsNotEmpty({ message: 'method not is empty' })
  method: string;

  @IsNotEmpty({ message: 'module not is empty' })
  module: string;
}
