import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { User } from "../users/users.model";
import { UserRoles } from "./user-roles.model";

interface RolesCreationAtrrs{
  value: string;
  description: string;
}

@Table({tableName: 'roles'})
export class Role extends Model<Role, RolesCreationAtrrs>{
  @ApiProperty({example: 1, description: 'Уникальный айди роли пользователя'})
  @Column({
      type: DataType.INTEGER,
      unique: true,
      autoIncrement: true,
      primaryKey: true,
    }
  )
  id: number;

  @ApiProperty({example: 'TEACHER', description: 'Уникальное значени роли'})
  @Column({ type: DataType.STRING, unique: true, allowNull: false})
  value: string;

  @ApiProperty({example: 'Преподователь', description: 'Описание роли'})
  @Column({ type: DataType.STRING, allowNull: false})
  description: string;

  @BelongsToMany(()=> User, ()=> UserRoles)
  users: User[];
}