import { Module } from '@nestjs/common';
import { ArticlesModule } from './modules/articles.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getMongoConfig } from './config/db-connect.config';
import { ScheduleModule } from '@nestjs/schedule';
import { CronjobsModule } from './modules/cronjobs.module';
import { AdminModule } from './modules/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'envs/.backend.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoConfig,
    }),
    ScheduleModule.forRoot(),
    ArticlesModule,
    CronjobsModule,
    AdminModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
