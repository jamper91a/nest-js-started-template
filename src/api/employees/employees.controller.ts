import { Controller, Get } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Roles } from '../../decorator/roles.decorator';
import { Constants } from '../../util/constants';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserAuth } from '../../decorator/user.decorator';
import { TokenAuthEntity } from '../../auth/entities/user-auth';

@ApiTags('Employees')
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  /**
   * Get the employees of a company. It is used by the admin of the company
   */
  @Roles(Constants.groups.admin)
  @ApiBearerAuth('jwt-admin')
  @Get('by-company')
  async findByCompanyId(@UserAuth() token: TokenAuthEntity) {
    return this.employeesService.findByCompanyId(token.company.id);
  }
}
