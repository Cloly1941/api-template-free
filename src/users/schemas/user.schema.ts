// ** NestJS
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// ** Mongoose
import { HydratedDocument } from 'mongoose';

// ** Enums
import { RoleType } from '../../configs/enums/user.enum';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: false, default: null })
  password: string;

  @Prop({ required: true })
  name: string;

  @Prop({
    type: String,
    enum: RoleType,
    default: RoleType.USER,
  })
  role: RoleType;

  @Prop()
  resetToken?: string;

  @Prop()
  resetTokenExpiry?: Date;

  @Prop()
  refreshToken: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
