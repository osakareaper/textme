import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { RegisterUserDto } from './dtos/register-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  @ApiOperation({
    summary: 'Get all users',
    description: 'Retrieves a list of all users.',
  })
  async getUsers() {
    return this.usersService.getUsers();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get user by ID',
    description: 'Retrieves a user by their unique ID.',
  })
  async getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Post('register')
  @ApiOperation({
    summary: 'Register a new user',
    description:
      'Registers a new user with the provided username, email and password.',
  })
  @ApiBody({ type: RegisterUserDto })
  async createUser(@Body() registerUserDto: RegisterUserDto) {
    return this.usersService.registerUser(
      registerUserDto.username,
      registerUserDto.email,
      registerUserDto.password,
    );
  }

  @Post('login')
  @ApiOperation({
    summary: 'Login a user',
    description:
      'Logs in a user with the provided username or email and password.',
  })
  @ApiBody({ type: LoginUserDto })
  async validateUser(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.validateUser(
      loginUserDto.usernameOrEmail,
      loginUserDto.password,
    );
  }
}
