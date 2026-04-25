import mongoose, { Document } from 'mongoose';

export interface ISubject extends Document {
  name: string;
  class: string;
  teacherName: string;
  hoursPerWeek: number;
}

const SubjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  class: { type: String, required: true },
  teacherName: { type: String, required: true },
  hoursPerWeek: { type: Number, required: true, min: 1 }
});

export default mongoose.model<ISubject>('Subject', SubjectSchema);
