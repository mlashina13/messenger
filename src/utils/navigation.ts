import { Router } from '../core/Router';
import * as Pages from '../pages';

const router: Router = new Router('.app');

router
  .use('/', Pages.LoginPage)
  .use('/login', Pages.LoginPage)
  .use('/sign-up', Pages.RegistrationPage)
  .use('/settings', Pages.ProfilePage)
  .use('/messenger', Pages.ChatPage);
// .start();

export function navigation(path: string) {
  router.go(path);
}

export function back(pathname: string) {
  router.back(pathname);
}
export function start() {
  router.start();
}
/*
import * as Pages from '../pages';
ebugger;
const pages = {
    '/login': Pages.LoginPage,
    '/sign-up': Pages.RegistrationPage,
    '/messenger': Pages.ChatPage
};

export function navigation(page: string) {
    const app = document.getElementById('app')!;

    //@ts-ignore
    const Component = pages[page]

    const component = new Component();

    app.innerHTML = '';
    app.append(component.getContent()!);
}
*/
