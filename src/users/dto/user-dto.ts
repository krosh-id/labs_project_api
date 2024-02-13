import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreateUserDto {
  @ApiProperty({example: 'test@mail.ru', description: 'Email пользователя'})
  readonly email: string;

  @ApiProperty({example: '123456', description: 'Пароль пользователя'})
  password: string;
}

export class FilterUserDto{
  @ApiPropertyOptional({ example: 'test@mail.ru', type: String })
  @IsOptional()
  @IsString()
  email?: object
}
export class UpdateUserDto {
  @ApiProperty({example: true, description: 'Забанен ли пользователя', type: Boolean})
  @IsOptional()
  banned?: boolean;

  @ApiProperty({example: 'Захотелось', description: 'Причина бана пользователя', type: String})
  @IsOptional()
  banReason?: string;
}