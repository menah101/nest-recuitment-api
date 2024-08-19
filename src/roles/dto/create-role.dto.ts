import { IsArray, IsBoolean, IsMongoId, IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';

export class CreateRoleDto {
  @IsNotEmpty({ message: 'name is not empty' })
  name: string;

  @IsNotEmpty({ message: 'description is not empty' })
  description: string;

  @IsNotEmpty({ message: 'isActive is not empty' })
  @IsBoolean({ message: 'isActive is true or false' })
  isActive: string;

  @IsNotEmpty({ message: 'isActive is not empty' })
  @IsMongoId({ each: true, message: 'each permission is mongo object id' })
  @IsArray({ message: 'permissions is array' })
  permissions: mongoose.Schema.Types.ObjectId[];
}
