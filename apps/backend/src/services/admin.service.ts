import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdminModel } from '../models/admin.model';
import { JwtService } from '@nestjs/jwt';
import { hashConstants, jwtConstantsAccess } from '../constants';
import {
  AccessTokenDto,
  AdminDto,
  PartialAdminDto,
} from '../../../libs/shared/dto/admin.dto';
import { compare, hash } from 'bcryptjs';
import { decode } from 'jsonwebtoken';
import _ from 'lodash';

@Injectable()
export class AdminService implements OnModuleInit {
  constructor(
    @InjectModel(AdminModel.name)
    private readonly adminModel: Model<AdminModel>,
    private readonly jwtService: JwtService
  ) {}

  async onModuleInit() {
    try {
      const res = await this.adminModel.findOne({ login: 'admin2' });

      if (!res) {
        const newAdmin = {
          login: 'admin',
          password:
            '$2a$05$kCaZJFR4ByBVuvUaxIMGzeetzu3v8zDaHRffH0/6YMz5829soXH9.',
        };
        await this.adminModel.create(newAdmin);
      }
    } catch (error) {
      throw error;
    }
  }

  async validateAdmin(login: string, password: string): Promise<Partial<any>> {
    const admin: AdminDto = await this.findAdmin(login);
    if (admin?.password) {
      const isEqual = await compare(password, admin.password);
      if (isEqual) return { admin: admin };

      return { error: true, message: 'Incorrect login or password' };
    }

    return { error: true, message: 'Incorrect login or password' };
  }

  async login(body: AdminDto): Promise<AccessTokenDto> {
    const payload = {
      login: body.login,
    };

    return {
      access_token: this.jwtService.sign(payload, jwtConstantsAccess),
    };
  }

  public async findAdmin(login: string): Promise<AdminDto> {
    return this.adminModel.findOne({ login: login });
  }

  public async findByToken(token: string): Promise<PartialAdminDto> | null {
    const decoded: any = decode(token);

    if (decoded) {
      return _.pick(decoded, ['login']);
    } else return null;
  }

  async logout(): Promise<void> {
    console.log('logout');
  }
}
