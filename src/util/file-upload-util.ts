import { Request } from 'express';

export const imageFileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback,
) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};
