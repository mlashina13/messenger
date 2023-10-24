import Handlebars, { HelperOptions } from 'handlebars';
import { nanoid } from 'nanoid';
import Block from './Block';

interface BlockComponent {
  element(): Element;
}

interface BlockComponentClass<T> extends BlockComponent{
  new (props: unknown): T
}

interface BlockComponentClass<T> {
  new (props: unknown): T;
}

export function registerComponent<T extends BlockComponentClass<T>>(name: string, Component: typeof Block<Object>) {
  if (name in Handlebars.helpers) {
    throw `The ${name} component is already registered!`;
  }

  Handlebars.registerHelper(name, function (this: unknown, { hash, data, fn }: HelperOptions) {
    const component = new Component(hash);
    const id = nanoid(6);
    const dataAttribute = `data-id="${id}"`;

    if ('ref' in hash) {
      (data.root.__refs = data.root.__refs || {})[hash.ref] = component;
    }

    (data.root.__children = data.root.__children || []).push({
      component,
      embed(fragment: DocumentFragment) {
        const stub = fragment.querySelector(`[${dataAttribute}]`);

        if (!stub) {
          return;
        }

        component.getContent()?.append(...Array.from(stub.childNodes));

        stub.replaceWith(component.getContent()!);
      },
    });

    const contents = fn ? fn(this) : '';

    return `<div ${dataAttribute}>${contents}</div>`;
  });
}
