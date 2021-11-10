import { Controller } from '@nestjs/common';
import { ReturnsService } from './returns.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Returns')
@Controller('returns')
export class ReturnsController {
  constructor(private readonly returnsService: ReturnsService) {}
}
