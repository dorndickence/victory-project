import mongoose, { Document } from 'mongoose';

export interface IExam extends Document {
  subject: string;
  class: string;
  date: string;
  duration: string;
  maxMarks: number;
  status: 'Upcoming' | 'Completed';
}

const ExamSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  class: { type: String, required: true },
  date: { type: String, required: true },
  duration: { type: String, required: true },
  maxMarks: { type: Number, required: true, min: 1 },
  status: { type: String, enum: ['Upcoming', 'Completed'], default: 'Upcoming' }
});

export default mongoose.model<IExam>('Exam', ExamSchema);
