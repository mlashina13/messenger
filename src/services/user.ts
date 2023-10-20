import { apiHasError } from '../utils/apiHasError';
import { TUser, TUserProfile } from '../type';
import UserApi from '../api/user';
import { transformUser } from '../utils/apiTransformers';

const userApi = new UserApi();

const changeUser = async (user: TUserProfile) => {
  const responseUser = await userApi.changeProfile(user);
  if (apiHasError(responseUser)) {
    throw Error(responseUser.reason);
  }

  window.store.set({ user: responseUser });
};

const getUserByLogin = async (login: string): Promise<TUser[]> => {
  const responseUser = await userApi.getUserByLogin(login);
  if (apiHasError(responseUser)) {
    throw Error(responseUser.reason);
  }

  return responseUser;
};

const changePassword = async (data: Object) => {
  const response = await userApi.changePassword(data);
  if (apiHasError(response)) {
    throw Error(response.reason);
  }
};

const changeAvatar = async (data: FormData) => {
  const responseUser = await userApi.changeAvatar(data);
  if (apiHasError(responseUser)) {
    throw Error(responseUser.reason);
  }

  window.store.set({ user: transformUser(responseUser as TUser) });
};

export {
  changeUser,
  changePassword,
  changeAvatar,
  getUserByLogin,
};
