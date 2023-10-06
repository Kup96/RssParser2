import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { ConfigService } from '../config/config.service';
import { IConfigParams } from '../interfaces/config-params';
import { userService } from './index';

const httpClientFactory = (
  configService: ConfigService<IConfigParams>
): AxiosInstance => {
  const httpClient = axios.create({
    baseURL: 'http://localhost:3000/api',
    timeout: 30000,
  });

  const authHeaderInterceptor = async (
    config: AxiosRequestConfig
  ): Promise<any> => {
    const tokenFromLocalStorage: string | null = await localStorage.getItem(
      'token'
    );

    if (tokenFromLocalStorage && config.headers) {
      config.headers['Authorization'] = `Bearer ${tokenFromLocalStorage}`;
    }

    return config;
  };

  const errorsHandlerInterceptor = (response: any): any => {
    if (response.status === 401) {
      const errorText = response.data?.message || response.statusText;
      userService.logOut();
      throw new Error(errorText);
    }

    return response;
  };

  httpClient.interceptors.request.use(authHeaderInterceptor);
  httpClient.interceptors.response.use(errorsHandlerInterceptor);

  return httpClient;
};

export default httpClientFactory;
