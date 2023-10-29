import { Route } from './Route';
import Block from './Block';
import { RefType } from '../type';

export class Router {
  private routes: Route[];

  private history: History;

  private _rootQuery: string;

  private _currentRoute: Route;

  constructor(rootQuery: string) {
    this.routes = [];
    this.history = window.history;
    this._rootQuery = rootQuery;

    // Router.__instance = this;
  }

  use(pathname: string, block: unknown) {
    const route = new Route(pathname, block as Block<Object, RefType>, { rootQuery: this._rootQuery });

    this.routes.push(route);

    return this;
  }

  start() {
    window.onpopstate = ((event: PopStateEvent) => {
      this._onRoute(event.state.pathname);
    });

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  go(pathname: string) {
    this.history.pushState({ pathname }, '', pathname);
    this._onRoute(pathname);
  }

  back(pathname: string) {
    this._onRoute(pathname);
  }

  getRoute(pathname: string) {
    const route = this.routes.find((route: Route) => route.match(pathname));
    return route || null;
  }
}
