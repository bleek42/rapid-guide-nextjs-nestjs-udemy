import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UserController {
  private readonly logger = new Logger();
  constructor(private readonly userService: UserService) {}

  @Post('register')
  public async postUser(@Body() body: CreateUserDto): Promise<User> {
    return await this.userService.create(body);
  }

  @Get()
  public async getAllUsers(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  public async getUserById(@Param('id') id: number) {
    return await this.userService.findOneById(id);
  }

  @Patch(':id')
  public async updateUser(@Param('id') id: number, @Body() body: UpdateUserDto) {
    return await this.userService.update(id, body);
  }

  @Delete(':id')
  public async deleteUser(@Param('id') id: number) {
    return await this.userService.remove(+id);
  }
}
