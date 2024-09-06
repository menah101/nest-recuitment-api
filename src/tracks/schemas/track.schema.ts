import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

export type TrackDocument = HydratedDocument<Track>;

@Schema({ timestamps: true })
export class Track {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  imgUrl: string;

  @Prop()
  trackUrl: string;

  @Prop()
  countLike: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  uploader: mongoose.Schema.Types.ObjectId;

  @Prop({ type: Object })
  createdBy: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
  };

  @Prop({ type: Object })
  updatedBy: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
  };

  @Prop({ type: Object })
  deletedBy: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
  };

  @Prop()
  createdAt: string;

  @Prop()
  updatedAt: string;

  @Prop()
  isDeleted: boolean;

  @Prop()
  DeletedAt: Date;
}

export const TrackSchema = SchemaFactory.createForClass(Track);
