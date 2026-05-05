import mongoose, { Document } from 'mongoose';

export interface IBorrowRecord extends Document {
  bookTitle: string;
  studentName: string;
  issueDate: string;
  dueDate: string;
  returnDate?: string;
  status: 'Borrowed' | 'Returned' | 'Overdue';
}

const BorrowRecordSchema = new mongoose.Schema({
  bookTitle: { type: String, required: true },
  studentName: { type: String, required: true },
  issueDate: { type: String, required: true },
  dueDate: { type: String, required: true },
  returnDate: { type: String },
  status: { type: String, enum: ['Borrowed', 'Returned', 'Overdue'], default: 'Borrowed' }
});

export default mongoose.model<IBorrowRecord>('BorrowRecord', BorrowRecordSchema);
