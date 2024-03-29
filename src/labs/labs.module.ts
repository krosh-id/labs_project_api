import { forwardRef, Module } from "@nestjs/common";
import { LabsController } from './labs.controller';
import { LabsService } from './labs.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { Labs } from "./labs.models";
import { AuthModule } from "../auth/auth.module";

@Module({
  controllers: [LabsController],
  providers: [LabsService],
  imports: [
    SequelizeModule.forFeature([Labs]),
    forwardRef(() => AuthModule),
  ],
  exports: [LabsController]
})
export class LabsModule {}
