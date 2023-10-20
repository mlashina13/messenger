import { ChatDTO } from '../api/type';
import { TChat, TUser } from '../type';

const buildPathToResource = (resource: string | null) => {
  if (!resource) {
    return null;
  }
  const HOST = 'https://ya-praktikum.tech/api/v2';
  return `${HOST}/resources/${resource}`;
};

export const transformUser = (data: TUser): TUser => <TUser>{
  password: data.password,
  avatar: buildPathToResource(data.avatar),
  id: data.id,
  login: data.login,
  first_name: data.first_name,
  second_name: data.second_name,
  display_name: data.display_name,
  phone: data.phone,
  email: data.email,
};

export const transformChats = (data: ChatDTO[]): TChat[] => data.map((chat) => ({
  avatar: buildPathToResource(chat.avatar),
  id: chat.id,
  title: chat.title,
  unreadCount: chat.unread_count,
  last_message: chat.last_message ? {
    content: chat.last_message.content,
    time: chat.last_message.time,
    user: {
      id: chat.last_message.user.id,
      login: chat.last_message.user.login,
      first_name: chat.last_message.user.first_name,
      second_name: chat.last_message.user.second_name,
      display_name: chat.last_message.user.display_name,
      avatar: chat.last_message.user.avatar,
      phone: chat.last_message.user.phone,
      email: chat.last_message.user.email,
    },
  } : null,
}));
