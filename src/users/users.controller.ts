import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "./dto/user-dto";
import { UsersService } from "./users.service";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./users.model";
import { Roles } from "../auth/roles-auth.decorator";
import { RolesGuard } from "../auth/role.guard";

@ApiTags('Пользователи')
@ApiBearerAuth()
@Controller('users')
export class UsersController {

  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({status: 200, type: User})
  @Roles("TEACHER")
  @UseGuards(RolesGuard)
  @Post('/create')
  create(@Body() userDto: CreateUserDto){
    return this.userService.createUser(userDto)
  }

  @ApiOperation({ summary: 'Получения всех пользователей' })
  @ApiResponse({status: 200, type: [User]})
  @Roles("STUDENT")
  @UseGuards(RolesGuard)
  @Get('/')
  getAll(){
    return this.userService.getUserAll()
  }
}
