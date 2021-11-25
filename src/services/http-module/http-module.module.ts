import { Module } from '@nestjs/common';
import { HttpModuleService } from './http-module.service';

@Module({
  providers: [HttpModuleService],
  exports: [HttpModuleService],
})
export class HttpModuleModule {}
