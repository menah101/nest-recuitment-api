import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  ValidateNested,
} from 'class-validator';
import mongoose from 'mongoose';

class Company {
  @IsNotEmpty()
  _id: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty()
  name: string;
}

export class CreateJobDto {
  @IsNotEmpty({
    message: 'Name is not empty',
  })
  name: string;

  @IsNotEmpty({
    message: 'Skills is not empty',
  })
  skills: string[];

  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => Company)
  company: Company;

  @IsNotEmpty({
    message: 'Location is not empty',
  })
  location: string;

  @IsNotEmpty({
    message: 'Salary is not empty',
  })
  salary: string;

  @IsNotEmpty({
    message: 'Quantity is not empty',
  })
  quantity: string;

  @IsNotEmpty({
    message: 'Level is not empty',
  })
  level: string;

  @IsNotEmpty({
    message: 'Description is not empty',
  })
  description: string;

  @IsNotEmpty({
    message: 'StartDate is not empty',
  })
  startDate: Date;

  @IsNotEmpty({
    message: 'EndDate is not empty',
  })
  endDate: Date;
}
