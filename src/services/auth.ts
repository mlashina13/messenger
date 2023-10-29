import AuthApi from '../api/auth';
import { LoginRequestData } from '../api/type';
import { apiHasError } from '../utils/apiHasError';
import { transformUser } from '../utils/apiTransformers';
import { navigation } from '../utils/navigation';
import { TAppState, TUser } from '../type';
import { Store } from '../core/Store';
import { initState } from '../core/constain';

const authApi = new AuthApi();

const getUser = async () => {
  const responseUser = await authApi.me();
  if (apiHasError(responseUser)) {
    throw Error(responseUser.reason);
  }

  return transformUser(responseUser as TUser);
};

const signin = async (data: LoginRequestData) => {
  const response = await authApi.login(data);
  if (apiHasError(response)) {
    throw Error(response.reason);
  }

  const me = await getUser();

  window.store.set({ user: me });
  navigation('/messenger');
};

const signup = async (data: TUser) => {
  try {
    await authApi.create(data);
  } catch (error) {
    if (apiHasError(error?.response)) {
      throw Error(error.response.reason);
    }
    return;
  }

  const me = await getUser();
  window.store.set({ user: transformUser(me) });
  navigation('/messenger');
};

const logout = async () => {
  await authApi.logout();
  window.store = new Store<TAppState>(initState);
  navigation('/');
};

export {
  signin,
  signup,
  logout,
  getUser,
};
