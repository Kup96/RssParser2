import { AxiosInstance } from 'axios';
import { AdminDto } from '../../../libs/shared/dto/admin.dto';

class UserService {
  private readonly baseRoute = 'admin';

  constructor(private readonly httpClient: AxiosInstance) {}

  public async login(body: AdminDto) {
    return this.httpClient.post(`${this.baseRoute}/login`, body);
  }

  public async logOut() {
    return this.httpClient.post(`${this.baseRoute}/logout`);
  }

  public async findByToken() {
    return this.httpClient.get(`${this.baseRoute}/findbytoken`);
  }
}

export default UserService;
