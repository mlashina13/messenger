import { expect } from 'chai';
import sinon from 'sinon';
import { Router } from './Router';
import Block from './Block';

interface IProps {
    events?: Record<string, () => void>;
    text?: string
}

type Refs = {}

describe('Проверка Router', () => {
  let PageClass: typeof Block<IProps, Refs>;
  const text = 'text';
  before(() => {
    class Page extends Block<IProps, Refs> {
      constructor(props: IProps) {
        super(props);
      }

      protected render(): string {
        return (`
           <div id="app">{{text}}</div>
        `);
      }
    }

    PageClass = Page;
  })

  afterEach(() => {
    sinon.restore()
  })

  it('Проверяем, что компонент добавляется на страницу данные по указанному querySelector', () => {
    const querySelector = '.app';
    const router = new Router(querySelector);
    const component = new PageClass({ text });
    router
      .use('/', component).start();
    const element = component.element?.innerHTML;
    expect(element).to.be.eq(text)
  })

  it('Проверяем, что компонент добавляется на страницу данные если НЕ указан querySelector', () => {
    const querySelector = '.test';
    const router = new Router(querySelector);
    const component = new PageClass({ text });
    router
      .use('/', component).start();
    const element = component.element?.innerHTML;
    expect(element).to.be.eq(text)
  })

  it('Проверяем что вызывается установка компонента при загрузки страницы', () => {
    const router = new Router('.app');
    const component = new PageClass();
    const spyRouter = sinon.spy(router, '_onRoute');
    router
      .use('/', component)
      .start()
    expect(spyRouter.calledOnce).to.be.true;
  });

  it('Проверяем функцию добавления роутинга', () => {
    const router = new Router('.app');
    const component = new PageClass();
    const spyRouter = sinon.spy(router, 'getRoute');
    router
      .use('/', component)
      .use('/login', component)
      .use('/sign-up', component);
    router.getRoute('/login');
    expect(spyRouter.returnValues[0]).to.be.not.null;
  })
})
