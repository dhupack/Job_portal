
import { HTTP_CODES } from '../utils/httpCodes';
import { ErrorMessages  } from '../utils/errorMessage';
import {User,IUser } from '../models/user';

export const authService = {
  signup: async (email: string, password: string, name: string): Promise<any> => {
    console.log("checking for existing user");

    const existing = await User.findOne({ email });
    if (existing) throw new Error(ErrorMessages.USER_ALREADY_EXISTS);
    console.log("user already exists");
    const user = new User({ email, password, name });
    await user.save();
    console.log("user saved");
    return user;
  },

  login: async (email: string, password: string): Promise<any> => {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      throw new Error(ErrorMessages.INVALID_CREDENTIALS);
    }
    return user;
  },
};