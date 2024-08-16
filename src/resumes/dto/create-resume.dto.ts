import { Type } from 'class-transformer';
import {
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  ValidateNested,
} from 'class-validator';
import mongoose from 'mongoose';

export class CreateResumeDto {
  @IsEmail(
    {},
    {
      message: 'Email not is valid',
    },
  )
  @IsNotEmpty({
    message: 'Name is not empty',
  })
  email: string;

  @IsNotEmpty({
    message: 'User id is not empty',
  })
  userId: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty({
    message: 'Url is not empty',
  })
  url: string;

  @IsNotEmpty({
    message: 'Status is not empty',
  })
  status: string;

  @IsNotEmpty({
    message: 'Company id is not empty',
  })
  companyId: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty({
    message: 'Job id is not empty',
  })
  jobId: mongoose.Schema.Types.ObjectId;
}

export class CreateUserCvDto {
  @IsNotEmpty({
    message: 'Url is not empty',
  })
  url: string;

  @IsNotEmpty({
    message: 'Company id is not empty',
  })
  @IsMongoId({ message: 'Company id is mongo id' })
  companyId: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty({
    message: 'Job id is not empty',
  })
  @IsMongoId({ message: 'Job id is mongo id' })
  jobId: mongoose.Schema.Types.ObjectId;
}
