import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PdfService } from './pdf.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModuleModule } from '../http-module/http-module.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('pdf.api.secret'),
        signOptions: {
          algorithm: 'HS256',
        },
      }),
      inject: [ConfigService],
    }),
    ConfigModule,
    HttpModuleModule,
  ],
  providers: [PdfService],
  exports: [PdfService],
})
export class PdfModule {}
