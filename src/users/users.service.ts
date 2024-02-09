import { Injectable } from '@nestjs/common';
import { User } from "./users.model";
import { InjectModel } from "@nestjs/sequelize";
import { CreateUserDto } from "./dto/user-dto";
import { RolesService } from "../roles/roles.service";

@Injectable()
export class UsersService {

  constructor(@InjectModel(User) private userRepository: typeof User,
              private roleService: RolesService) {}

  async createUser(dto: CreateUserDto): Promise<User>{
    const user = await this.userRepository.create(dto)
    const role = await this.roleService.getRoleByValue('STUDENT')
    await user.$set('roles', [role.id])
    user.roles = [role]
    return user;
  }

  async getUserAll(): Promise<Object[]>{
    return await this.userRepository.findAll({include: {all: true}})
  }

  async getUserByEmail(email: string){
    return await this.userRepository.findOne({where: {email}, include: {all: true}})
  }
}
