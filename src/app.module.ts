import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { envFileUtil } from './utils/env.util';
import { ConfigUtil } from './utils/config.util';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

const envFilePath: string = envFileUtil(`${__dirname}/env`);

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath,
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: ConfigUtil,
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
