import { HttpTransport } from '../core/httpTransport';
import { APIError } from './type';
import { TUser, TUserProfile } from '../type';

const userApi = new HttpTransport('/user');

export default class UserApi {
  async changeProfile(data: TUserProfile): Promise<TUser> {
    return userApi.put('/profile', data);
  }

  async changeAvatar(data: FormData): Promise<TUser | APIError> {
    return userApi.put('/profile/avatar', data);
  }

  async getUser(id: string): Promise<TUser | APIError> {
    return userApi.get(`/user/${id}`);
  }

  async getUserByLogin(id: string): Promise<TUser[] | APIError> {
    return userApi.post('/search', { login: id });
  }

  async changePassword(data: Object): Promise<void> {
    return userApi.put('/password', data);
  }
}
