import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './api/users/users.module';
import configuration from '../config/configuration';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { GroupsModule } from './api/groups/groups.module';
import { CompaniesModule } from './api/companies/companies.module';
import { ConsolidatedInventoriesModule } from './api/consolidated-inventories/consolidated-inventories.module';
import { DealersModule } from './api/dealers/dealers.module';
import { ReturnsModule } from './api/returns/returns.module';
import { ReturnsHistoryModule } from './api/returns-history/returns-history.module';
import { EmployeesModule } from './api/employees/employees.module';
import { EmployeesInventoriesModule } from './api/employees-inventories/employees-inventories.module';
import { EpcsModule } from './api/epcs/epcs.module';
import { InventoriesModule } from './api/inventories/inventories.module';
import { InventoriesProductsModule } from './api/inventories-products/inventories-products.module';
import { InventoryErpModule } from './api/inventory-erp/inventory-erp.module';
import { ProductsModule } from './api/products/products.module';
import { ProductsZonesModule } from './api/products-zones/products-zones.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        dialect: 'mysql',
        host: configService.get('db.mysql.host'),
        port: +configService.get('db.mysql.port'),
        username: configService.get('db.mysql.username'),
        password: configService.get('db.mysql.password'),
        database: configService.get('db.mysql.database'),
        autoLoadModels: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    GroupsModule,
    CompaniesModule,
    ConsolidatedInventoriesModule,
    DealersModule,
    ReturnsModule,
    ReturnsHistoryModule,
    EmployeesModule,
    EmployeesInventoriesModule,
    EpcsModule,
    InventoriesModule,
    InventoriesProductsModule,
    InventoryErpModule,
    ProductsModule,
    ProductsZonesModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
