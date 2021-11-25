import { Injectable } from '@nestjs/common';

//Below modules are needed for file processing
import { existsSync, mkdirSync, unlinkSync, writeFileSync } from 'fs';

@Injectable()
export class FilesService {
  // upload file
  uploadFile(path: string, filename: string, file: Express.Multer.File) {
    try {
      this.validatePath(path);
      const destination = this.formatName(path + '/' + filename);
      writeFileSync(destination, file.buffer);
      return destination;
    } catch (e) {
      return null;
    }
  }

  removeFile(path: string, filename: string) {
    this.validatePath(path);
    const destination = this.formatName(path + '/' + filename);
    unlinkSync(destination);
  }

  private validatePath(path: string) {
    if (!existsSync(path)) {
      mkdirSync(path, { recursive: true });
    }
  }

  private formatName(filename: string) {
    return filename.replace(/ /g, '');
  }
}
