export enum FormatPdf {
  pdf = 'pdf',
  html = 'html',
  zip = 'zip',
  xlsx = 'xlsx',
}

export enum OutputPdf {
  base64 = 'base64',
  url = 'url',
  I = 'I',
}

export class GenerateDocumentPdfDto {
  name: string;
  format: FormatPdf;
  output: OutputPdf;
}
