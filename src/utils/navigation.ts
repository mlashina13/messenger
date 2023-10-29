import { Router } from '../core/Router';
import * as Pages from '../pages';

const router: Router = new Router('.app');
export function initRouter() {
  router
    .use('/', Pages.LoginPage)
    .use('/login', Pages.LoginPage)
    .use('/sign-up', Pages.RegistrationPage)
    .use('/settings', Pages.ProfilePage)
    .use('/messenger', Pages.ChatPage)
    .use('/404', Pages.Page404)
    .use('/500', Pages.Page500)
    .start();
}

export function navigation(path: string) {
  router.go(path);
}

export function back(pathname: string) {
  router.back(pathname);
}
