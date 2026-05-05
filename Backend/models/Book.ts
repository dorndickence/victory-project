import mongoose, { Document } from 'mongoose';

export interface IBook extends Document {
  title: string;
  author: string;
  category: string;
  copies: number;
  available: number;
}

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  copies: { type: Number, required: true, min: 0 },
  available: { type: Number, required: true, min: 0 }
});

export default mongoose.model<IBook>('Book', BookSchema);
