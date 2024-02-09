import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { User } from "../users/users.model";
import { Labs } from "./labs.models";
import { QueryTypes } from "sequelize";
import { CreateLabsDto } from "./dto/labs-dto";

@Injectable()
export class LabsService {

  constructor(@InjectModel(Labs) private labsRepository: typeof Labs) {}

  async createLab(dto: CreateLabsDto): Promise<Labs>{
    return await this.labsRepository.create(dto);
  }

  async getLabsAll(): Promise<Labs[]> {
    return await this.labsRepository.findAll()
  }
}
