
import { ErrorMessages  } from '../utils/errorMessage';
import Admin from '../models/Admin';

export const authService = {
  signup: async (email: string, password: string, name: string): Promise<any> => {
    const existing = await Admin.findOne({ email });
    if (existing) throw new Error(ErrorMessages.ADMIN_ALREADY_EXISTS);
    const admin = new Admin({ email, password, name });
    await admin.save();
    return admin;
  },

  login: async (email: string, password: string): Promise<any> => {
    const admin = await Admin.findOne({ email });
    if (!admin || !(await admin.comparePassword(password))) {
      throw new Error(ErrorMessages.INVALID_CREDENTIALS);
    }
    return admin;
  },
};