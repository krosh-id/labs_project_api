import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { Labs } from "./labs.models";
import { Op} from "sequelize";
import { CreateLabsDto, LabsFilterDto } from "./dto/labs-dto";

@Injectable()
export class LabsService {

  constructor(@InjectModel(Labs) private labsRepository: typeof Labs) {}

  async createLab(dto: CreateLabsDto): Promise<Labs>{
    return await this.labsRepository.create(dto);
  }

  async getLabsAll(filter: LabsFilterDto){
    if (filter.subject) {
      filter.subject = { [Op.substring]: filter.subject };
    }

    return await this.labsRepository
      .findAndCountAll({
        where: { ...filter },
        order: ['createdAt'],
      });
  }
}
