import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Role } from "../roles/roles.model";
import { UserRoles } from "../roles/user-roles.model";
import { Labs } from "../labs/labs.models";

interface UserCreationAtrrs{
  email: string;
  password: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAtrrs>{
  @ApiProperty({example: 1, description: 'Уникальный айди пользователя'})
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
    }
  )
  id: number;

  @ApiProperty({example: 'test@mail.ru', description: 'Email пользователя'})
  @Column({ type: DataType.STRING, unique: true, allowNull: false})
  email: string;

  @ApiProperty({example: '123456', description: 'Пароль пользователя'})
  @Column({ type: DataType.STRING, allowNull: false})
  password: string;

  @ApiProperty({example: true, description: 'Забанен ли пользователя'})
  @Column({ type: DataType.BOOLEAN, defaultValue: false})
  banned: boolean;

  @ApiProperty({example: 'Захотелось', description: 'Причина бана пользователя'})
  @Column({ type: DataType.STRING, allowNull: true})
  banReason: string;

  @BelongsToMany(()=> Role, ()=> UserRoles)
  roles: Role[];

  @HasMany(()=> Labs)
  labs: Labs[];
}