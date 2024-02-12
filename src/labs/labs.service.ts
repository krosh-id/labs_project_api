import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Labs } from "./labs.models";
import { QueryTypes } from "sequelize";
import { CreateLabsDto, LabsFilterDto, UpdateLabDto } from "./dto/labs-dto";

@Injectable()
export class LabsService {

  constructor(@InjectModel(Labs) private labsRepository: typeof Labs) {}

  async createLab(dto: CreateLabsDto){
    return await this.labsRepository.sequelize.query(
      'INSERT INTO labs_subject (subject, count, description) VALUES ($subject, $count, $description)',
      {
        bind: {
          subject: dto.subject,
          count: dto.count,
          description: dto.description
        },
        type: QueryTypes.SELECT
      }
    );

  }

  async getLabsAll(filter: LabsFilterDto){
    let labs: Object[]
    if(filter.subject){
      labs = await this.labsRepository.sequelize.query(
        'SELECT * FROM labs_subject WHERE labs_subject.subject ILIKE $search_name',
        {
          bind: {
            search_name: '%'+filter.subject+'%'
          },
          type: QueryTypes.SELECT
        }
      );
    }
    else {
      labs = await this.labsRepository.sequelize.query(
        'SELECT * FROM labs_subject',
        {
          type: QueryTypes.SELECT
        }
      );
    }

    return JSON.stringify(labs, null, 2)
  }

  async updateLabById(lab_id: number, dto: UpdateLabDto){
    const lab = await this.labsRepository.findByPk(lab_id)
    if (!lab){
      throw new HttpException(
        `Лабораторной с id ${lab_id} не найдена`,
        HttpStatus.NOT_FOUND)
    }
    if (dto.description) {
      await this.labsRepository.sequelize.query(
        'UPDATE labs_subject SET description = $description WHERE id = $id',
        {
          bind: {
            description: dto.description,
            id: lab_id
          },
          type: QueryTypes.SELECT
        }
      )
    }

    if (dto.subject) {
      await this.labsRepository.sequelize.query(
        'UPDATE labs_subject SET subject = $subject WHERE id = $id',
        {
          bind: {
            subject: dto.subject,
            id: lab_id
          },
          type: QueryTypes.SELECT
        }
      )
    }

    if (dto.mark) {
      await this.labsRepository.sequelize.query(
        'UPDATE labs_subject SET mark = $mark WHERE id = $id',
        {
          bind: {
            mark: dto.mark,
            id: lab_id
          },
          type: QueryTypes.SELECT
        }
      )
    }

    if (dto.course) {
      await this.labsRepository.sequelize.query(
        'UPDATE labs_subject SET course = $course WHERE id = $id',
        {
          bind: {
            course: dto.course,
            id: lab_id
          },
          type: QueryTypes.SELECT
        }
      )
    }

    return lab;
  }
  async deleteLabById(lab_id: number){
    const lab = await this.labsRepository.findByPk(lab_id)
    if (!lab){
      throw new HttpException(
        `Лабораторной с id ${lab_id} не найдена`,
        HttpStatus.NOT_FOUND)
    }
    await this.labsRepository.sequelize.query(
      'DELETE FROM labs_subject WHERE id=$id',
      {
        bind: {
          id: lab_id
        },
        type: QueryTypes.SELECT
      }
    )

    return lab;
  }
}
