import { registerComponent } from './core/resgiterComponent';
import { Store } from './core/Store';
import { TAppState } from './type';
import * as Components from './components';
import { initApp } from './services/initApp';
import { back, navigation } from './utils/navigation';

declare global {
    interface Window {
        store: Store<TAppState>;
    }

}

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

window.store = new Store<TAppState>(initState);

Object.entries(Components).forEach(
  ([componentName, component]) => registerComponent(componentName, component),
);

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

window.addEventListener('click', filter, false);
function filter(e: MouseEvent) {
  const element = e.target as HTMLAnchorElement;
  if (element.tagName === 'A') { // провека что кликнули на ссылку
    e.preventDefault(); // отменяем переход
    navigation(element.pathname.toString()); // переходите по ссылке
  }
}
window.addEventListener('popstate', history, false);
function history(popstateEvent: PopStateEvent) {
  console.log(popstateEvent);
  // document.title = popstateEvent.state.title;
  back(popstateEvent.state.pathname);
}
