import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  hashpassword: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    hashpassword: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, 
  }
);

const User = mongoose.model<IUser>('User', userSchema);

export default User;
