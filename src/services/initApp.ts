import { getUser } from './auth';
import { getChatsService } from './chat';
import { navigation } from '../utils/navigation';

const initApp = async () => {
  let me = null;
  try {
    me = await getUser();
  } catch (error) {
    if (window.location.pathname !== '/sign-up') {
      navigation('/login');
    } else { navigation(window.location.pathname); }
    return;
  }
  window.store.set({ user: me });
  navigation(window.location.pathname);
};

const initChatPage = async () => {
  const chats = await getChatsService();
  window.store.set({ chats });
};

export {
  initApp,
  initChatPage,
};
