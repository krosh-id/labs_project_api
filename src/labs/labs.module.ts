import { Module } from '@nestjs/common';
import { LabsController } from './labs.controller';
import { LabsService } from './labs.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { Labs } from "./labs.models";

@Module({
  controllers: [LabsController],
  providers: [LabsService],
  imports: [
    SequelizeModule.forFeature([Labs])
  ]
})
export class LabsModule {}
