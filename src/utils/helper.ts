import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs';
import { ENV } from '../config/env';

export const generateToken = (payload: { id: string; role: string }): string => {
  return jwt.sign(payload, ENV.JWT_SECRET, { expiresIn: '1d' });
};

export const uploadFile = async (file: Express.Multer.File, destination: string): Promise<string> => {
  const uniqueName = `${uuidv4()}-${file.originalname}`;
  const filePath = path.join(__dirname, '..', '..', 'public', destination, uniqueName);
  await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
  await fs.promises.writeFile(filePath, file.buffer);
  return `/public/${destination}/${uniqueName}`;
};