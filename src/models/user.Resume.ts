import mongoose, { Schema, Document } from 'mongoose';

export interface IResume extends Document {
  user: mongoose.Types.ObjectId;
  filePath: string;
  fileName: string;
  uploadedAt: Date;
}

const resumeSchema = new Schema<IResume>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  filePath: { type: String, required: true },
  fileName: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

export default mongoose.model<IResume>('Resume', resumeSchema);