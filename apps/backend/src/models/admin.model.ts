import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IAdmin } from '../interfaces/admin.interface';

@Schema({ collection: 'admin', timestamps: true })
export class AdminModel extends Document implements IAdmin {
  @Prop({ required: true })
  login: string;

  @Prop({ required: true })
  password: string;
}
export const AdminSchema = SchemaFactory.createForClass(AdminModel);
