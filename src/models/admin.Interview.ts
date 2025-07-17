import mongoose, { Schema, Document } from 'mongoose';

export interface IInterview extends Document {
  application: mongoose.Types.ObjectId;
  scheduledAt: Date;
  interviewer: mongoose.Types.ObjectId;
  status: 'scheduled' | 'completed' | 'canceled';
}

const interviewSchema = new Schema<IInterview>({
  application: { type: Schema.Types.ObjectId, ref: 'Application', required: true },
  scheduledAt: { type: Date, required: true },
  interviewer: { type: Schema.Types.ObjectId, ref: 'Admin', required: true },
  status: { type: String, enum: ['scheduled', 'completed', 'canceled'], default: 'scheduled' },
});

export default mongoose.model<IInterview>('Interview', interviewSchema);