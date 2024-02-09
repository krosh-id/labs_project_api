import { Injectable } from '@nestjs/common';
import { User } from "./users.model";
import { InjectModel } from "@nestjs/sequelize";
import { CreateUserDto } from "./dto/user-dto";
import sequelize, { QueryTypes } from "sequelize";

@Injectable()
export class UsersService {

  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async createUser(dto: CreateUserDto): Promise<User>{
    return await this.userRepository.create(dto);
  }

  async getUserAll(): Promise<Object[]>{
    return await this.userRepository.sequelize.query('SELECT * FROM users', {
      type: QueryTypes.SELECT,
    });
  }

}
