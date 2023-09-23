import Handlebars from 'handlebars';
import {HelperOptions} from "handlebars";


export interface BlockComponent {
  element(): Element;
}

export  interface BlockComponentClass<T> extends BlockComponent{
  new (props: unknown): T
}

type ComponentType<T extends BlockComponentClass<T>> = {new (props: ConstructorParameters<InstanceType<T>>)}

export function registerComponent<T extends BlockComponentClass<T>>(name: string, Component: ComponentType<T>) {
  if (name in Handlebars.helpers) {
    throw `The ${name} component is already registered!`;
  }

  Handlebars.registerHelper(name, function (this: unknown, {hash, data, fn}: HelperOptions) {
    const component = new Component(hash);
    const dataAttribute = `data-id="${component.id}"`;

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
      }
    });

    const contents = fn ? fn(this) : '';

    return `<div ${dataAttribute}>${contents}</div>`;
  });
}
