import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "../users/users.model";
import { CreateLabsDto, LabsFilterDto } from "./dto/labs-dto";
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
  @Roles("STUDENT")
  @UseGuards(RolesGuard)
  @Get('/')
  getAll(@Query() labsFilter: LabsFilterDto,){
    return this.labsService.getLabsAll(labsFilter)
  }
}
