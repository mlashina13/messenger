import { HttpTransport } from '../core/httpTransport';
import { APIError, ChatDTO, CreateChat } from './type';
import { TAddUsers } from '../type';

const chatApi = new HttpTransport('/chats');

export default class ChatApi {
  async create(data: CreateChat): Promise<void | APIError> {
    return chatApi.post<void>('/', data);
  }

  async getChats(): Promise<ChatDTO[] | APIError > {
    return chatApi.get<ChatDTO[]>('');
  }

  async deleteUser(data: TAddUsers): Promise<void | APIError > {
    return chatApi.delete<void>('/users', data);
  }

  async addUser(data: TAddUsers): Promise<void | APIError > {
    return chatApi.put<void>('/users', data);
  }

  async getToken(chatId: number): Promise<string | APIError> {
    return chatApi.post<string>(`/token/${chatId}`);
  }
}
