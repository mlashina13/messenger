import { registerComponent } from './core/resgiterComponent';
import { Store } from './core/Store';
import { TAppState } from './type';
import * as Components from './components';
import { initApp } from './services/initApp';
import { initRouter, navigation } from './utils/navigation';
import { initState } from './core/constain';

declare global {
    interface Window {
        store: Store<TAppState>;
    }
}

window.store = new Store<TAppState>(initState);
Object.entries(Components).forEach(
  ([componentName, component]) => registerComponent(componentName, component),
);

document.addEventListener('DOMContentLoaded', () => {
  initApp();
  initRouter();
});

window.addEventListener('click', filter, false);
function filter(e: MouseEvent) {
  const element = e.target as HTMLAnchorElement;
  if (element.tagName === 'A') { // провека что кликнули на ссылку
    e.preventDefault(); // отменяем переход
    navigation(element.pathname.toString()); // переходите по ссылке
  }
}
