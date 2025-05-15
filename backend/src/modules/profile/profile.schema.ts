import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProfileDocument = Profile & Document;

@Schema()
export class Profile {
  @Prop()
  bio: string;

  @Prop()
  avatar: string;

  @Prop({ type: Number, enum: [0, 1], default: 0 })
  role: number;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
