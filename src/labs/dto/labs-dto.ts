import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateLabsDto {
  @ApiProperty({example: 'Математика', description: 'Предмет сдачи лаб'})
  @IsString()
  readonly subject: string;

  @ApiProperty({example: 5, description: 'Количество лаб по предмету'})
  @IsNumber()
  readonly count: number;

  @ApiProperty({example: 3, description: 'Номер курса предмета'})
  @IsNumber()
  readonly course: number;

  @ApiProperty({
      example: 'Для изучения основ счёта',
      description: 'Краткое описание предмета',
    }
  )
  @IsString()
  readonly description: string;
}

export class LabsFilterDto {
  @ApiPropertyOptional({ example: 'Название предмета', type: String })
  @IsOptional()
  @IsString()
  subject?: object;
}