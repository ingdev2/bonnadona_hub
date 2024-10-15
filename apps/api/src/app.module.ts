import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

require('dotenv').config();

import { UsersModule } from './users/users.module';
import { IdTypesModule } from './id_types/id_types.module';
import { GenderTypesModule } from './gender_types/gender_types.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.TYPEORM_HOST,
      port: +process.env.TYPEORM_PORT,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
      logging: false,
    }),
    UsersModule,
    IdTypesModule,
    GenderTypesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
