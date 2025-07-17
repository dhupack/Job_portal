
import { ErrorMessages  } from '../utils/errorMessage';
import Resume from '../models/user.Resume';
import { uploadFile } from '../utils/helper';

export const resumeService = {
  uploadResume: async (userId: string, file: Express.Multer.File): Promise<any> => {
    const filePath = await uploadFile(file, 'resumes');
    const resume = new Resume({
      user: userId,
      filePath,
      fileName: file.originalname,
    });
    await resume.save();
    return resume;
  },
};