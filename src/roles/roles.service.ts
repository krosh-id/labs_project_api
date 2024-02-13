import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from "./dto/roles.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Role } from "./roles.model";

@Injectable()
export class RolesService {

  constructor(@InjectModel(Role) private roleService: typeof Role) {
  }

  async createRole(dto: CreateRoleDto){
      return await this.roleService.create(dto)
  }

  async getRoleByValue(value: string){
      return await this.roleService.findOne({where: {value}})
  }
}
