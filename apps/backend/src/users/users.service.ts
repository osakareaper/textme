import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }

  async registerUser(
    username: string,
    email: string,
    password: string,
  ): Promise<User> {
    if (!username || !email || !password) {
      throw new BadRequestException(
        'Username, email and password are required',
      );
    }

    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
      throw new BadRequestException('Invalid email format');
    }

    if (username.length < 3 || username.length > 20) {
      throw new BadRequestException(
        'Username must be between 3 and 20 characters',
      );
    }

    if (password.length < 8) {
      throw new BadRequestException('Password must be at least 8 characters');
    }

    if (password.length > 100) {
      throw new BadRequestException('Password must not exceed 100 characters');
    }

    if (
      !/(?=.*[A-Z])/.test(password) || // at least one uppercase letter
      !/(?=.*\d)/.test(password) || // at least one number
      !/(?=.*[!@#$%^&*()_+={}[\]:;"'<>,.?/\\-])/.test(password) // at least one special character
    ) {
      throw new BadRequestException(
        'Password must contain at least one uppercase letter, one number, and one special character',
      );
    }

    const isEmailRegistered = await this.userRepository.findOne({
      where: { email },
    });
    if (isEmailRegistered) {
      throw new BadRequestException('Email is already registered');
    }

    const isUsernameTaken = await this.userRepository.findOne({
      where: { username },
    });
    if (isUsernameTaken) {
      throw new BadRequestException('Username is already taken');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      username,
      email,
      password: hashedPassword,
    });
    return this.userRepository.save(user);
  }

  async validateUser(usernameOrEmail: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials');
    }

    return user;
  }
}
