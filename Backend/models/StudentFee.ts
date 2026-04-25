import mongoose, { Document } from 'mongoose';

export interface IStudentFee extends Document {
  studentId: string;
  studentName: string;
  class: string;
  month: string;
  amount: number;
  paid: number;
  due: number;
  status: 'Paid' | 'Partial' | 'Unpaid';
  dueDate: string;
}

const StudentFeeSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  studentName: { type: String, required: true },
  class: { type: String, required: true },
  month: { type: String, required: true },
  amount: { type: Number, required: true, min: 0 },
  paid: { type: Number, required: true, min: 0 },
  due: { type: Number, required: true, min: 0 },
  status: { type: String, enum: ['Paid', 'Partial', 'Unpaid'], required: true },
  dueDate: { type: String, required: true }
});

export default mongoose.model<IStudentFee>('StudentFee', StudentFeeSchema);
