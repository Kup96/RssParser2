import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminService } from '../services/admin.service';
import { AdminDto } from '../../../libs/shared/dto/admin.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private adminService: AdminService) {
    super({
      usernameField: 'login',
      passwordField: 'password',
    });
  }

  async validate(login: string, password: string): Promise<Partial<AdminDto>> {
    const { admin, error, message } = await this.adminService.validateAdmin(
      login,
      password
    );

    if (!admin && error) {
      throw new UnauthorizedException(message);
    }

    return admin;
  }
}
