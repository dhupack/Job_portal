import mongoose, { Schema, Document } from 'mongoose';

export interface IApplication extends Document {
  user: mongoose.Types.ObjectId;
  job: mongoose.Types.ObjectId;
  resume: mongoose.Types.ObjectId;
  status: 'pending' | 'accepted' | 'rejected';
  appliedAt: Date;
}

const applicationSchema = new Schema<IApplication>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  job: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
  resume: { type: Schema.Types.ObjectId, ref: 'Resume', required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  appliedAt: { type: Date, default: Date.now },
});

export default mongoose.model<IApplication>('Application', applicationSchema);