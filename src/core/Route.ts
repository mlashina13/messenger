import Block from './Block';
import { RefType } from '../type';

function isEqual(lhs: unknown, rhs: unknown) {
  return lhs === rhs;
}

function render(query: string, block: Block<Object, RefType>) {
  let root = document.querySelector(query);
  root = root || document.querySelector('main');
  if (!root) {
    root = document.createElement('main')
    root.setAttribute('id', 'rootId');
    document.body.append(root)
  }
  root.innerHTML = '';
  root.append(block.getContent()!);
  return root;
}

export class Route {
  _pathname: string;

  _blockClass;

  _block: Block<Object, RefType>;

  _props: Record<string, string>;

  constructor(pathname: string, view: Block<Object, RefType>, props: Record<string, string>) {
    this._pathname = pathname;
    this._blockClass = view;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname);
  }

  render() {
    this._block = new (this._blockClass as any)();
    render(this._props.rootQuery as string, this._block);
  }
}
