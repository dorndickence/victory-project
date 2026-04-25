import mongoose, { Document } from 'mongoose';

export interface IAttendanceRecord extends Document {
  month: string;
  present: number;
  absent: number;
}

const AttendanceRecordSchema = new mongoose.Schema({
  month: { type: String, required: true },
  present: { type: Number, default: 0 },
  absent: { type: Number, default: 0 }
});

export default mongoose.model<IAttendanceRecord>('AttendanceRecord', AttendanceRecordSchema);