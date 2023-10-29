import { TAppState } from '../type';

export default {
  HOST: 'https://ya-praktikum.tech/api/v2',
  WSS: 'wss://ya-praktikum.tech/ws/chats',
} as const;

export const initState: TAppState = {
  error: null,
  user: null,
  isOpenChangePassword: false,
  isOpenLoadPhoto: false,
  isOpenDialogChat: false,
  isOpenDialogAddUser: false,
  chats: [],
  messages: [],
  socket: null,
  activeChat: null,
  blockMessage: true,
};
