// import { HTTP_CODES } from '../../../utils/httpCodes';
import { ErrorMessages  } from '../utils/errorMessage';
import {User} from '../models/user';

export const userService = {
  listUsers: async (): Promise<any[]> => {
    return User.find().select('-password').lean();
  },

  deleteUser: async (userId: string): Promise<void> => {
    const user = await User.findByIdAndDelete(userId);
    if (!user) throw new Error(ErrorMessages.USER_NOT_FOUND);
  },
};