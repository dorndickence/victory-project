import mongoose, { Document } from 'mongoose';

export interface IStudent extends Document {
  id: string;
  name: string;
  class: string;
  rollNo: number;
  feesDue: number;
  attendance: number;
  avatar: string;
  status: 'Active' | 'Inactive';
}

const StudentSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  class: { type: String, required: true },
  rollNo: { type: Number, required: true },
  feesDue: { type: Number, default: 0 },
  attendance: { type: Number, min: 0, max: 100 },
  avatar: { type: String },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' }
});

export default mongoose.model<IStudent>('Student', StudentSchema);