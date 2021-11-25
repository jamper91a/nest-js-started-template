import { Injectable } from '@nestjs/common';
import got from 'got';
import { GenerateDocumentPdfDto } from './dto/generate-document-pdf.dto';

@Injectable()
export class HttpModuleService {
  public async pdfGeneratorRequest(
    templateId: number,
    query: GenerateDocumentPdfDto,
    token: string,
    jsonData: any,
  ) {
    console.log(jsonData);
    const url = `https://us1.pdfgeneratorapi.com/api/v3/templates/${templateId}/output?
      name=${query.name}&format=${query.format}&output=${query.output}`;
    try {
      const response = await got.post(url, {
        headers: {
          authorization: `Bearer ${token}`,
        },
        json: jsonData,
      });

      return response.body;
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}
