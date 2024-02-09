import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto/user-dto";
import { UsersService } from "./users.service";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./users.model";

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {

  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({status: 200, type: User})

  @Post('/create')
  create(@Body() userDto: CreateUserDto){
    return this.userService.createUser(userDto)
  }

  @ApiOperation({ summary: 'Получения всех пользователей' })
  @ApiResponse({status: 200, type: [User]})
  @Get('/')
  getAll(){
    return this.userService.getUserAll()
  }
}
