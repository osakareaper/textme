import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { CreateUserDto } from './dtos/create-user.dto';

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

  @Post('create')
  @ApiOperation({
    summary: 'Create a new user',
    description: 'Creates a new user with the provided username and email.',
  })
  @ApiBody({ type: CreateUserDto })
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(
      createUserDto.username,
      createUserDto.email,
      createUserDto.password,
    );
  }
}
