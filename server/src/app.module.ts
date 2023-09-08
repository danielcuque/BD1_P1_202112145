import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configureConnection } from './config/configure';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilesService } from './files/files.service';

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   load: [configureConnection],
    //   isGlobal: true,
    // }),
    // TypeOrmModule.forRootAsync({
    //   useFactory: (configService: ConfigService) => ({
    //     type: 'mysql',
    //     host: configService.get('HOST'),
    //     port: +configService.get('PORT'),
    //     username: configService.get('MYSQL_USER'),
    //     password: configService.get('MYSQL_PASSWORD'),
    //     database: configService.get('MYSQL_DATABASE'),
    //     entities: [],
    //   }),
    //   inject: [ConfigService],
    //   imports: [ConfigModule],
    // }),
  ],
  controllers: [AppController],
  providers: [AppService, FilesService],
})
export class AppModule {}