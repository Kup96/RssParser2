import { makeAutoObservable, computed, observable } from 'mobx';
import UsersService from '../data-services/users.service';
import jwtDecode from 'jwt-decode';
import 'reflect-metadata';
import { AdminDto } from '../../../libs/shared/dto/admin.dto';

export class SessionStore {
  @observable currentUser = {};
  @observable isLoading = false;
  @observable private _accessToken: string | null = null;
  @observable private _2FA: string | null = null;

  constructor(private readonly usersService: UsersService) {
    makeAutoObservable(this);
    this._accessToken = localStorage.getItem('token');
    this.getUser();
  }

  @computed
  public get token(): string | null {
    return this._accessToken;
  }

  public get isAuthenticated() {
    return !!this._accessToken;
  }

  public get accessTokenExpirationTime(): number | null {
    if (!this._accessToken) {
      return null;
    }
    const decodedToken = jwtDecode(this._accessToken);

    // eslint-disable-next-line
    return (decodedToken as any).exp;
  }

  public getTokens = async () => {
    const token = localStorage.getItem('token');

    if (token) {
      this._accessToken = token;
      await this.getUser();
    } else {
      this._accessToken = null;
    }
  };

  public setLoading = async (bool: boolean) => {
    this.isLoading = bool;
  };

  public setUser = async (user: any) => {
    this.currentUser = user;
  };

  public login = async (loginData: AdminDto) => {
    const response = await this.usersService.login(loginData);
    await this.setToken(response.data.access_token);
    await this.getUser();
  };

  public getUser = async () => {
    try {
      await this.setLoading(true);
      const user = await this.usersService.findByToken();
      await this.setUser(user?.data.user);
    } catch (e) {
      this.currentUser = {};
      await this.setToken(null);
      throw new Error('Something going wrong');
    } finally {
      await this.setLoading(false);
    }
  };

  public logOut = async () => {
    await this.setToken(null);
    await this.setUser({});
  };

  public clearToken = (): void => {
    localStorage.removeItem('token');
    this._accessToken = null;
    this._2FA = null;
  };

  private readonly setToken = async (token: string | null) => {
    if (token) {
      localStorage.setItem('token', token);
      this._accessToken = token;
    } else {
      this.clearToken();
    }
  };
}
