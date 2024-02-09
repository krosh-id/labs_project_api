import { ApiProperty } from "@nestjs/swagger";

export class CreateLabsDto {
  @ApiProperty({example: 'Математика', description: 'Предмет сдачи лаб'})
  readonly subject: string;

  @ApiProperty({example: 5, description: 'Количество лаб по предмету'})
  readonly count: number;
}