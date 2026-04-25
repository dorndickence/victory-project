import mongoose, { Document } from 'mongoose';

export interface IFeeRecord extends Document {
  month: string;
  collected: number;
  pending: number;
}

const FeeRecordSchema = new mongoose.Schema({
  month: { type: String, required: true },
  collected: { type: Number, default: 0 },
  pending: { type: Number, default: 0 }
});

export default mongoose.model<IFeeRecord>('FeeRecord', FeeRecordSchema);