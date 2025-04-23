import mongoose, { Schema, Document } from 'mongoose';

export interface IItem extends Document {
  name: string;
  description: string;
  price: number;
  imageurl: string;
  stock: number;
  category: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const itemSchema = new Schema<IItem>(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    imageurl: { type: String, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Item = mongoose.model<IItem>('Item', itemSchema);

export default Item;
