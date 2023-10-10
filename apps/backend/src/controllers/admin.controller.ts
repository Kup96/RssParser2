import {
  Controller,
  Get,
  Request,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from '../services/admin.service';
import {
  AccessTokenDto,
  AdminDto,
  PartialAdminDto,
} from '../../../libs/shared/dto/admin.dto';
import { LocalAuthGuard } from '../guards/local-auth.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() request, @Body() body): Promise<AccessTokenDto> {
    return await this.adminService.login(body);
  }

  @Post('logout')
  async logout(@Request() request): Promise<void> {
    return await this.adminService.logout();
  }

  @Get('/findbytoken')
  public async findbyToken(
    @Body() payload: any
  ): Promise<PartialAdminDto> | null {
    const user = await this.adminService.findByToken(payload);

    if (!user) {
      return null;
    }

    return user;
  }
}
