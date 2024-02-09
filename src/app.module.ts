import { Module } from '@nestjs/common';
import { SequelizeModule } from "@nestjs/sequelize";
import { LabsModule } from './labs/labs.module';
import { UsersModule } from './users/users.module';
import { User } from "./users/users.model";
import { Labs } from "./labs/labs.models";
import { RolesController } from './roles/roles.controller';
import { RolesService } from './roles/roles.service';
import { RolesModule } from './roles/roles.module';
import { Role } from "./roles/roles.model";
import { UserRoles } from "./roles/user-roles.model";
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'labs_report',
      models: [User, Labs, Role, UserRoles],
      autoLoadModels: true
    }),
    LabsModule,
    UsersModule,
    RolesModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
