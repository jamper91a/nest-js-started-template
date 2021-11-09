import { Employee } from '../../api/employees/entities/employee.entity';
import { Company } from '../../api/companies/entities/company.entity';
import { Dealer } from '../../api/dealers/entities/dealer.entity';
import { Group } from '../../api/groups/entities/group.entity';
import { User } from '../../api/users/entities/user.entitity';

export class UserAuth {
  id: number;
  name: string;
  username: string;
  username_rfdi?: string;
  active: boolean;
  groupId: number;
  group: Group;

  parse(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.username = user.username;
    this.username_rfdi = user.username_rfdi;
    this.active = user.active;
    this.groupId = user.groupId;
    this.group = user.group;
  }
}

export class TokenAuthEntity {
  user: UserAuth;
  employee: Employee;
  company: Company;
  dealer: Dealer;
}
