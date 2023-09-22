import Handlebars from 'handlebars';
import { registerComponent } from './resgiterComponent';
import * as Components from '../components';
import * as Partials from '../partials';
import Block from "./Block";

export function registerHelper() {
  Handlebars.registerPartial('Logo', Partials.Logo);
  Handlebars.registerPartial('Form', Partials.Form);

  registerComponent('InputField', Components.InputField);
  registerComponent('Error', Components.Error);
  registerComponent('Input', Components.Input);
  registerComponent('Button', Components.Button);
  registerComponent('Link', Components.Link);
}

export function render(query: string, block: Block<Object>) {
  const root = document.querySelector(query);
  if (root) {
    root.appendChild(block.getContent() as HTMLElement);
    block.dispatchComponentDidMount();
    return root;
  }
}
