import { BadRequestException, HttpException, Injectable } from '@nestjs/common';

//Below modules are needed for file processing
import * as fs from 'fs';
import * as util from 'util';
import stream = require('stream');
import fastify = require('fastify');

@Injectable()
export class TasksService {
  fileName = '';

  // upload file
  async uploadFile(
    path: string,
    req: fastify.FastifyRequest,
    res: fastify.FastifyReply<any>,
  ): Promise<any> {
    this.fileName = path;
    //Check request is multipart
    if (!req.isMultipart()) {
      res.send(
        new BadRequestException(
          new AppResponseDto(400, undefined, 'Request is not multipart'),
        ),
      );
      return;
    }
    const mp = req.multipart(this.handler, onEnd);
    // for key value pairs in request
    mp.on('field', function (key: any, value: any) {
      console.log('form-data', key, value);
    });

    // Uploading finished
    async function onEnd(err: any) {
      if (err) {
        res.send(new HttpException('Internal server error', 500));
        return;
      }
      res
        .code(200)
        .send(new AppResponseDto(200, undefined, 'Data uploaded successfully'));
    }
  }

  //Save files in directory
  async handler(
    field: string,
    file: any,
    filename: string,
    encoding: string,
    mimetype: string,
  ): Promise<void> {
    console.log(file);
    console.log(filename);
    console.log(encoding);
    console.log(mimetype);
    const pipeline = util.promisify(stream.pipeline);
    const writeStream = fs.createWriteStream(
      `uploads/${this.fileName}` + '.png',
    ); //File path
    try {
      await pipeline(file, writeStream);
    } catch (err) {
      console.error('Pipeline failed', err);
    }
  }
}

class AppResponseDto {
  constructor(
    public statusCode: number,
    public data: any = undefined,
    public message: string = 'Success',
  ) {}
}
