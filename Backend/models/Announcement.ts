import mongoose, { Document } from 'mongoose';

export interface IAnnouncement extends Document {
  title: string;
  message: string;
  audience: 'All' | 'Students' | 'Teachers' | 'Parents';
  date: string;
  author: string;
}

const AnnouncementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  audience: { type: String, enum: ['All', 'Students', 'Teachers', 'Parents'], default: 'All' },
  date: { type: String, required: true },
  author: { type: String, required: true }
});

export default mongoose.model<IAnnouncement>('Announcement', AnnouncementSchema);
