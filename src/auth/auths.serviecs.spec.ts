import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/user-dto';
import { HttpException, HttpStatus } from "@nestjs/common";

jest.mock('../users/users.service');
jest.mock('@nestjs/jwt');

describe('AuthService', () => {
  let service: AuthService;
  let mockUsersService;
  let mockJwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UsersService, JwtService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    mockUsersService = module.get<UsersService>(UsersService);
    mockJwtService = module.get<JwtService>(JwtService);
  });

  it('should register a new user', async () => {
    const userDto: CreateUserDto = {
      email: 'test@example.com',
      password: 'password',
    };
    const expectedUser = {
      id: 1,
      email: userDto.email,
    };
    const expectedToken = 'token';

    mockUsersService.getUserByEmail.mockResolvedValueOnce(null);
    mockUsersService.createUser.mockResolvedValueOnce(expectedUser);
    mockJwtService.sign.mockResolvedValueOnce(expectedToken);

    const result = await service.registration(userDto);

    expect(result).toEqual({ token: expectedToken });
    expect(mockUsersService.getUserByEmail).toHaveBeenCalledWith(userDto.email);
    expect(mockUsersService.createUser).toHaveBeenCalledWith({
      ...userDto,
      password: expect.any(String), // Хешированный пароль
    });
    expect(mockJwtService.sign).toHaveBeenCalledWith({
      id: expectedUser.id,
      email: expectedUser.email,
      roles: [], // Добавьте роли, если они есть
    });
  });

  it('should throw an error if user already exists', async () => {
    const userDto: CreateUserDto = {
      email: 'test@example.com',
      password: 'password',
    };
    const existingUser = {
      id: 1,
      email: userDto.email,
    };

    mockUsersService.getUserByEmail.mockResolvedValueOnce(existingUser);

    await expect(service.registration(userDto)).rejects.toThrow(
      new HttpException('Пользователь с таким email уже существует', HttpStatus.BAD_REQUEST)
    );
  });
});
