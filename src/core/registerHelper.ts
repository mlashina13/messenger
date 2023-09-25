import { registerComponent } from './resgiterComponent';
import * as Components from '../components';
import Block from './Block';

export function registerHelper() {
  registerComponent('InputField', Components.InputField);
  registerComponent('Error', Components.Error);
  registerComponent('Input', Components.Input);
  registerComponent('Button', Components.Button);
  registerComponent('Link', Components.Link);
  registerComponent('Form', Components.Form);
  registerComponent('Logo', Components.Logo);
}

export function render(query: string, block: Block<Object>) {
  const root = document.querySelector(query);
  if (root) {
    root.appendChild(block.getContent() as HTMLElement);
    block.dispatchComponentDidMount();
    return root;
  }
}
