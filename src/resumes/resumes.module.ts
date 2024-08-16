import { Module } from '@nestjs/common';
import { ResumesService } from './resumes.service';
import { ResumesController } from './resumes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Resumes, ResumesSchema } from './schema/resume.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Resumes.name, schema: ResumesSchema }]),
  ],
  controllers: [ResumesController],
  providers: [ResumesService],
})
export class ResumesModule {}
