import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { CreateUserDto, FilterUserDto, UpdateUserDto } from "./dto/user-dto";
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
  @Roles("STUDENT", "TEACHER")
  @UseGuards(RolesGuard)
  @Get('/')
  getAll(@Query() labsFilter: FilterUserDto){
    return this.userService.getUserAll(labsFilter)
  }

  @ApiOperation({ summary: 'Удаление пользователя по id' })
  @ApiResponse({status: 200, type: [User]})
  @Roles("TEACHER")
  @UseGuards(RolesGuard)
  @Delete('/delete/:id')
  deleteById(@Param('id', new ParseIntPipe()) user_id: number){
    return this.userService.deleteUserById(user_id)
  }

  @ApiOperation({ summary: 'Обновление пользователя по id' })
  @ApiResponse({status: 200, type: [User]})
  @Roles("TEACHER")
  @UseGuards(RolesGuard)
  @Patch('/update/:id')
  updateById(@Param('id', new ParseIntPipe()) user_id: number,
             @Body() dto: UpdateUserDto){
    return this.userService.updateUserById(user_id, dto);
  }
}
