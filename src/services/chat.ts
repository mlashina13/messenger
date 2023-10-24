import ChatApi from '../api/chat';
import { apiHasError } from '../utils/apiHasError';
import { transformChats } from '../utils/apiTransformers';
import { TAddUsers } from '../type';

const chatApi = new ChatApi();

const getChatsService = async () => {
  const responseChat = await chatApi.getChats();
  if (apiHasError(responseChat)) {
    throw Error(responseChat.reason);
  }

  return transformChats(responseChat);
};

const createChatService = async (title: string) => {
  const response = await chatApi.create({ title });
  if (apiHasError(response)) {
    throw Error(response.reason);
  }

  const responseChatService = await chatApi.getChats();
  if (apiHasError(responseChatService)) {
    throw Error(responseChatService.reason);
  }

  const chats = await getChatsService();
  window.store.set({ chats });
};

const deleteUserToChatService = async (data: TAddUsers) => {
  const response = await chatApi.deleteUser(data);
  if (apiHasError(response)) {
    throw Error(response.reason);
  }
};

const addUserToChatService = async (data: TAddUsers) => {
  const response = await chatApi.addUser(data);
  if (apiHasError(response)) {
    throw Error(response.reason);
  }
};

const getTokenService = async (chatId: number): Promise<Object> => {
  const response = await chatApi.getToken(chatId);
  if (apiHasError(response)) {
    throw Error(response.reason);
  }
  return response;
};

export {
  createChatService,
  getChatsService,
  getTokenService,
  addUserToChatService,
  deleteUserToChatService
};
