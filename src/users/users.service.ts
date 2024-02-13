import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { User } from "./users.model";
import { InjectModel } from "@nestjs/sequelize";
import { CreateUserDto, FilterUserDto, UpdateUserDto } from "./dto/user-dto";
import { RolesService } from "../roles/roles.service";
import * as bgrypt from "bcryptjs"
import { Op } from "sequelize";

@Injectable()
export class UsersService {

  constructor(@InjectModel(User) private userRepository: typeof User,
              private roleService: RolesService) {}

  async createUser(dto: CreateUserDto): Promise<User>{
    dto.password = await bgrypt.hash(dto.password, 5)
    const user = await this.userRepository.create(dto)
    const role = await this.roleService.getRoleByValue('TEACHER')
    await user.$set('roles', [role.id])
    user.roles = [role]
    return user;
  }

  async getUserAll(filter: FilterUserDto): Promise<User[]>{
    if (filter.email) {
      filter.email = { [Op.substring]: filter.email };
    }
    return await this.userRepository
      .findAll({
        where: { ...filter },
        include: {
          all: true
        },
        order: ['createdAt'],
      })
  }

  async getUserByEmail(email: string){
    return await this.userRepository.findOne({where: {email}, include: {all: true}})
  }

  async deleteUserById(user_id: number) {
    const user = await this.userRepository.findByPk(user_id)
    if(!user_id){
      throw new HttpException(
        `Пользователь с id ${user_id} не найден`,
        HttpStatus.NOT_FOUND)
    }
    await this.userRepository.destroy({
      where: {
        id: user_id,
      },
    });
    return user;
  }

  async updateUserById(user_id: number, dto: UpdateUserDto) {
    const user = await this.userRepository.findByPk(user_id)
    if (!user_id) {
      throw new HttpException(
        `Пользователь с id ${user_id} не найден`,
        HttpStatus.NOT_FOUND)

    }
    if(dto.banned){
      user.banned = dto.banned
    }
    if(dto.banReason){
      user.banReason = dto.banReason
    }
    return await user.save()
  }

}
