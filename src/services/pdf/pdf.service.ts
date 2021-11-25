import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { HttpModuleService } from '../http-module/http-module.service';
import {
  FormatPdf,
  OutputPdf,
} from '../http-module/dto/generate-document-pdf.dto';

// const PDFGeneratorAPI = import('pdf-generator-api-client');

@Injectable()
export class PdfService {
  defaultClient = null;
  api = null;

  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private httpModuleService: HttpModuleService,
  ) {}

  /**
   * Todo Token not working and the file must be saved on 
   * @param template
   * @param data
   */
  async generatePdf(template: number, data: any) {
    let token = await this.jsonWebToken();
    token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI5ZTQ4MmQzNGExNTNiNjhmNTA4NGU0OWExYWI4NGQyZTZmMGM1MGFjMGQ0ODRkMGVmMjlhMTNkYTdjOWUxZDk0Iiwic3ViIjoiamFtcGVyOTFAaG90bWFpbC5jb20iLCJleHAiOjE2MzczNjgwMTh9.zIclpwn9T1GKGxak_TW1Fszo2r4swWoxKxdNnQKpRWo';
    const result = await this.httpModuleService.pdfGeneratorRequest(
      template,
      {
        name: 'TestDocument',
        format: FormatPdf.pdf,
        output: OutputPdf.base64,
      },
      token,
      data,
    );

    console.log(result);
  }

  private async jsonWebToken() {
    const payload = {
      iss: this.configService.get('pdf.api.key'),
      sub: this.configService.get('pdf.workspace'),
      exp: 1586112639,
    };

    console.log(payload);
    console.log(this.configService.get('pdf.api.secret'));

    const result = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('pdf.api.secret'),
    });
    console.log('jsonWebToken', result);
    return result;
  }
}
