import mongoose, { Schema, Document } from 'mongoose';

export interface IReport extends Document {
  title: string;
  type: 'user_activity' | 'job_activity' | 'application_stats';
  data: any;
  generatedBy: mongoose.Types.ObjectId;
  generatedAt: Date;
}

const reportSchema = new Schema<IReport>({
  title: { type: String, required: true },
  type: { type: String, enum: ['user_activity', 'job_activity', 'application_stats'], required: true },
  data: { type: Schema.Types.Mixed, required: true },
  generatedBy: { type: Schema.Types.ObjectId, ref: 'SuperAdmin', required: true },
  generatedAt: { type: Date, default: Date.now },
});

export default mongoose.model<IReport>('Report', reportSchema);