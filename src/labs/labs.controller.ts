import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "../users/users.model";
import { CreateLabsDto } from "./dto/labs-dto";
import { LabsService } from "./labs.service";

@ApiTags('Лабораторные работы')
@Controller('labs')
export class LabsController {

  constructor(private labsService: LabsService) {}

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({status: 200, type: User})

  @Post('/create')
  create(@Body() labsDto: CreateLabsDto){
    return this.labsService.createLab(labsDto)
  }

  @ApiOperation({ summary: 'Получения всех пользователей' })
  @ApiResponse({status: 200, type: [User]})
  @Get('/')
  getAll(){
    return this.labsService.getLabsAll()
  }
}
