import mongoose, { Document } from 'mongoose';

export interface ITeacher extends Document {
  id: string;
  name: string;
  subject: string;
  experience: number;
  avatar: string;
  status: 'Active' | 'On Leave';
}

const TeacherSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  subject: { type: String, required: true },
  experience: { type: Number, default: 0 },
  avatar: { type: String },
  status: { type: String, enum: ['Active', 'On Leave'], default: 'Active' }
});

export default mongoose.model<ITeacher>('Teacher', TeacherSchema);