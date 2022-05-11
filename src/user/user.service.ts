import { Injectable, BadRequestException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger();
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  public async create(dto: CreateUserDto): Promise<User> {
    const { username, email, password, confirmPassword } = dto;
    if (password !== confirmPassword) {
      throw new BadRequestException(
        'ERROR: Cannot POST /user - password and confirm password are not a match.',
      );
    }
    const user = new User({ username, email, password });
    this.logger.log(user);
    return await this.userRepository.save(user);
  }

  public async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  public async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }

  public async findOneByUsername(username: string): Promise<User> {
    return await this.userRepository.findOne({ username });
  }

  private async isUserAdmin({ id }: User): Promise<boolean> {
    const user = await this.findOneById(id);
    return user.isAdmin ? true : false;
  }

  public async update(id: number, dto: UpdateUserDto) {
    const user = this.findOneById(id);
    if (!user) throw new NotFoundException('Cannot UPDATE user: user does not exist.');

    if (dto.password && dto.password !== dto.confirmPassword) {
      throw new BadRequestException('Cannot UPDATE user: new passwords do not match.');
    }

    return await this.userRepository.update(id, { ...dto, id });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
