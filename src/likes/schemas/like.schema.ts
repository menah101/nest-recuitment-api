import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Track } from 'src/tracks/schemas/track.schema';
import { User } from 'src/users/schemas/user.schema';

export type LikeDocument = HydratedDocument<Like>;

@Schema({ timestamps: true })
export class Like {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  userId: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Track.name })
  trackId: mongoose.Schema.Types.ObjectId;

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

export const LikeSchema = SchemaFactory.createForClass(Like);
