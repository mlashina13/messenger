import { HttpTransport } from '../core/httpTransport';
import {
  APIError, LoginRequestData, SignUpResponse, UserDTO,
} from './type';

const authApi = new HttpTransport('/auth');

export default class AuthApi {
  async create(data: Object): Promise<SignUpResponse> {
    return authApi.post<SignUpResponse>('/signup', data);
  }

  async login(data: LoginRequestData): Promise<void | APIError> {
    return authApi.post('/signin', data);
  }

  async me(): Promise<UserDTO | APIError> {
    return authApi.get('/user');
  }

  async logout(): Promise<void | APIError> {
    return authApi.post('/logout');
  }
}
