import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AdminService } from '../services/admin.service';
import { jwtConstantsAccess } from '../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly adminService: AdminService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstantsAccess.secret,
    });
  }

  async validate(payload: any): Promise<any> {
    const admin: any = await this.adminService.findAdmin(payload.login);

    if (admin) {
      return admin;
    }
  }
}
