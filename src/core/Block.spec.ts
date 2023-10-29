import { expect } from 'chai';
import sinon from 'sinon';
import Block from './Block';

interface IProps {
    events?: Record<string, () => void>;
    text?: string
}

type Refs = {}

describe('Проверка Block', () => {
  let PageClass: typeof Block<IProps, Refs>;
  const rootElement = document.createElement('div');
  document.body.append(rootElement);
  before(() => {
    class Page extends Block<IProps, Refs> {
      constructor(props: IProps) {
        super({
          ...props
        });
      }

      render(): string {
        return (`
           <div id="app">{{text}}</div>
        `);
      }
    }
    PageClass = Page;
  })
  it('Проверка изменения свойств в компоненте', () => {
    const text = 'new text';
    const component = new PageClass({ text: 'text' });
    rootElement.append(component.getContent()!);
    component.setProps({ text })
    const element = component.element?.innerHTML;
    expect(element).to.be.eq(text)
  })

  it('Компонент устанавливает событие на элемент', () => {
    const handlerStub = sinon.stub();
    const component = new PageClass({ events: { click: handlerStub } });
    const event = new MouseEvent('click', {});
    component.element?.dispatchEvent(event);
    expect(handlerStub.calledOnce).to.be.true;
  })

  it('Проверка вызова dispatchComponentDidMount при установки элемента в дом', () => {
    const clock = sinon.useFakeTimers();
    const component = new PageClass();
    const spy = sinon.spy(component, 'componentDidMount')
    const element = component.getContent();

    document.body.append(element as HTMLElement)
    clock.next();

    expect(spy.calledOnce).to.be.true;
  })
})
