// ** Mongoose
import { Types } from 'mongoose';

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  avatar_frame?: Types.ObjectId;
  age?: number;
  gender?: string;
  bio?: string;
  birthday?: Date;
  avatar?: Types.ObjectId;
  cover?: Types.ObjectId;
  createdAt?: Date;
}
