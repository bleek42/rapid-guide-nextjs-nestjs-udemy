import { BadRequestException, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { UserService } from 'src/user/user.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AUTH');
  constructor(
    @Inject() private readonly userService: UserService,
    @Inject() private readonly jwtService: JwtService,
  ) {}

  private async isValidPassword(plainTxtPw: string, hashPw: string): Promise<boolean> {
    return await argon2.verify(hashPw, plainTxtPw);
  }

  public async login(username, password) {
    const existingUser = await this.userService.findOneByUsername(username);
    if (!existingUser)
      throw new NotFoundException(`ERROR: username and/or password does not match any records.`);

    const checkPasswords = await this.isValidPassword(password, existingUser.password);
    if (!checkPasswords)
      throw new BadRequestException(`ERROR: username and/or password does not match any records.`);

    const { id, isAdmin, isAmbassador } = existingUser;
    const jwt = await this.jwtService.signAsync({
      id,
      isAdmin,
      isAmbassador,
    });
    return jwt;
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
