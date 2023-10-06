import { IsNotEmpty } from 'class-validator';

export class AdminDto {
  @IsNotEmpty()
  login!: string;

  @IsNotEmpty()
  password!: string;
}

export class PartialAdminDto {
  login?: string;
  password?: string;
}

export interface AccessTokenDto {
  access_token: string;
}
