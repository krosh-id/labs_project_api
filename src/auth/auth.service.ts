import { Body, HttpException, HttpStatus, Injectable, Post, UnauthorizedException } from "@nestjs/common";
import { CreateUserDto } from "../users/dto/user-dto";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bgrypt from "bcryptjs"
import { User } from "../users/users.model";

@Injectable()
export class AuthService {

  constructor(private userService: UsersService,
              private jwtService: JwtService) {
  }

  private async validateUser(dto: CreateUserDto){
    const user = await this.userService.getUserByEmail(dto.email)
    const passwordEquals = await bgrypt.compare(dto.password, user.password)
    if (user && passwordEquals){
      return user;
    }
    throw new UnauthorizedException({message: 'Не правильный email или пароль'})
  }
  async login(@Body() userDto: CreateUserDto){
      const user = await this.validateUser(userDto)
      return this.generateToken(user)
  }

  async registration( userDto: CreateUserDto){
      const  candidate = await this.userService.getUserByEmail(userDto.email)
      if (candidate){
        throw new HttpException('Пользователь с таким email уже существует', HttpStatus.BAD_REQUEST)
      }
      const hashPassword = await bgrypt.hash(userDto.password, 5)
      const user = await this.userService.createUser({ ...userDto, password: hashPassword})
      return await this.generateToken(user)
  }

  private async generateToken(user: User){
    const payload = {
      id: user.id,
      email: user.email,
      roles: user.roles
    }
    return {
      token: this.jwtService.sign(payload)
    }
  }
}
