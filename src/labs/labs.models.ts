import { Column, DataType, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

interface LabCreationAtrrs{
  subject: string;
  count: number;
  course: number;
  description: string;
}

@Table({tableName: 'labs_subject'})
export class Labs extends Model<Labs, LabCreationAtrrs>{
  @ApiProperty({example: 1, description: 'Уникальный айди лабы'})
  @Column({
      type: DataType.INTEGER,
      unique: true,
      autoIncrement: true,
      primaryKey: true,
    }
  )
  id: number;

  @ApiProperty({example: 'Математика', description: 'Предмет сдачи лаб'})
  @Column({ type: DataType.STRING, unique: true, allowNull: false})
  subject: string;

  @ApiProperty({example: 3, description: 'Номер курса предмета'})
  @Column({ type: DataType.INTEGER, defaultValue: 1, allowNull: true})
  course: number;

  @ApiProperty({example: 5, description: 'Итоговая оценка за предмет'})
  @Column({ type: DataType.INTEGER, allowNull: true})
  mark: number;

  @ApiProperty({example: 5, description: 'Количество лаб по предмету'})
  @Column({ type: DataType.INTEGER, allowNull: false})
  count: number;

  @ApiProperty({
    example: 'Для изучения основ счёта',
    description: 'Краткое описание предмета',
    }
  )
  @Column({ type: DataType.STRING, allowNull: true})
  description: string;
}