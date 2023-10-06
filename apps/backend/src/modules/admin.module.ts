import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModel, AdminSchema } from '../models/admin.model';
import { AdminService } from '../services/admin.service';
import { AdminController } from '../controllers/admin.controller';
import { JwtService } from '@nestjs/jwt';
import { LocalStrategy } from '../strategy/local.strategy';
import { JwtStrategy } from '../strategy/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: AdminModel.name,
        schema: AdminSchema,
      },
    ]),
  ],
  providers: [AdminService, JwtService, LocalStrategy, JwtStrategy],
  controllers: [AdminController],
})
export class AdminModule {}
