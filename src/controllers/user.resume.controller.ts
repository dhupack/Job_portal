import { Request, Response } from 'express';
import { HTTP_CODES } from '../utils/httpCodes';
import { ErrorMessages } from '../utils/errorMessage';
import { resumeService } from '/home/user/job_PORTAL/src/Services/user.resume.service';
import Resume from '../models/user.Resume';
import { logger } from '../utils/logger';

export const uploadResume = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(HTTP_CODES.BAD_REQUEST).json({ message: ErrorMessages.NO_FILE_UPLOADED });
      return;
    }

    const file = req.file;
    if (!file.mimetype.includes('pdf')) {
      if (req.user) {
        logger.error(`${ErrorMessages.INVALID_FILE_TYPE}: ${req.user.email || req.user.id}`);
      }
      res.status(HTTP_CODES.BAD_REQUEST).json({ message: ErrorMessages.INVALID_FILE_TYPE });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      if (req.user) {
        logger.error(`${ErrorMessages.FILE_TOO_LARGE}: ${req.user.email || req.user.id}`);
      }
      res.status(HTTP_CODES.BAD_REQUEST).json({ message: ErrorMessages.FILE_TOO_LARGE });
      return;
    }

    if (!req.user) {
      logger.error(`${ErrorMessages.NO_FILE_UPLOADED}: No user authenticated`);
      res.status(HTTP_CODES.UNAUTHORIZED).json({ message: ErrorMessages.UNAUTHORIZED });
      return;
    }

    const resume = new Resume({
      userId: req.user.id,
      fileName: file.originalname,
      filePath: await resumeService.uploadResume(req.user.id, file),
    });

    await resume.save();
    logger.info(`Resume uploaded: ${resume.fileName} by user ${req.user.email || req.user.id}`);
    res.status(HTTP_CODES.CREATED).json({ message: 'Resume uploaded successfully', resume });
  } catch (error: any) {
    logger.error(`Error uploading resume: ${error.message}`);
    res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({ message: ErrorMessages.INTERNAL_SERVER_ERROR });
  }
};