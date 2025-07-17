import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
export interface ISuperAdmin extends Document {
  email: string;
  password: string;
  name: string;
  role: 'superadmin';
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const superAdminSchema = new Schema<ISuperAdmin>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, default: 'superadmin' },
});

superAdminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

superAdminSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<ISuperAdmin>('SuperAdmin', superAdminSchema);