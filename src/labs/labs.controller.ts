import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "../users/users.model";
import { CreateLabsDto, LabsFilterDto, UpdateLabDto } from "./dto/labs-dto";
import { LabsService } from "./labs.service";
import { Roles } from "../auth/roles-auth.decorator";
import { RolesGuard } from "../auth/role.guard";

@ApiTags('Лабораторные работы')
@ApiBearerAuth()
@Controller('labs')
export class LabsController {

  constructor(private labsService: LabsService) {}

  @ApiOperation({ summary: 'Создание лабораторных' })
  @ApiResponse({status: 200, type: User})
  @Roles("TEACHER")
  @UseGuards(RolesGuard)
  @Post('/create')
  create(@Body() labsDto: CreateLabsDto){
    return this.labsService.createLab(labsDto)
  }

  @ApiOperation({ summary: 'Получения всех лабораторных' })
  @ApiResponse({status: 200, type: [User]})
  @Roles("STUDENT", "TEACHER")
  @UseGuards(RolesGuard)
  @Get('/')
  getAll(@Query() labsFilter: LabsFilterDto){
    return this.labsService.getLabsAll(labsFilter)
  }

  @ApiOperation({ summary: 'Удаление лабораторной по id' })
  @ApiResponse({status: 200, type: [User]})
  @Roles("TEACHER")
  @UseGuards(RolesGuard)
  @Delete('/delete/:id')
  deleteById(@Param('id', new ParseIntPipe()) lab_id: number){
    return this.labsService.deleteLabById(lab_id)
  }

  @ApiOperation({ summary: 'Обновление лабораторной по id' })
  @ApiResponse({status: 200, type: [User]})
  @Roles("TEACHER")
  @UseGuards(RolesGuard)
  @Patch('/update/:id')
  updateById(@Param('id', new ParseIntPipe()) lab_id: number,
             @Body() dto: UpdateLabDto){
    return this.labsService.updateLabById(lab_id, dto);
  }
}
