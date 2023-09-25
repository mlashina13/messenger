import Handlebars from 'handlebars';
import EventBus from './EventBus';

export class Block <Props extends object > {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  protected props: Props;

  protected refs: Record<string, Block<Props>> = {};

  protected children: Block<object>[] = [];

  private eventBus: () => EventBus;

  private _element: HTMLElement | null = null;

  constructor(props?: Props) {
    const eventBus = new EventBus();

    if (props && Object.keys(props).length !== 0) {
      this.props = this._makePropsProxy(props) as Props;
    }
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _addEvents() {
    const { events = {} } = this.props as { events: Record<string, () => void> };

    Object.keys(events).forEach((eventName) => {
      this._element?.addEventListener(eventName, events[eventName]);
    });
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _init() {
    this.init();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  protected init() {
  }

  _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount() {
  }

  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate() {
    if (this.componentDidUpdate()) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  protected componentDidUpdate() {
    return true;
  }

  setProps = (nextProps: Props) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  value(): string {
    return '';
  }

  get element() {
    return this._element;
  }

  private _render() {
    const fragment = this.compile(this.render(), this.props);

    const newElement = fragment.firstElementChild as HTMLElement;

    if (this._element) {
      this._element.replaceWith(newElement);
    }

    this._element = newElement;

    this._addEvents();
  }

  private compile(template: string, context: object) {
    const contextAndStubs = {
      ...context,
      __children: [] as Array<{component: unknown, embed(node: DocumentFragment): void}>,
      __refs: this.refs,
    };

    const html = Handlebars.compile(template)(contextAndStubs);

    const templ = document.createElement('template');

    templ.innerHTML = html;

    contextAndStubs.__children?.forEach((item) => {
      item.embed(templ.content);
    });

    return templ.content;
  }

  protected render(): string {
    return '';
  }

  getContent() {
    return this.element;
  }

  _makePropsProxy(props: Props) {
    const self = this;

    //
    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop as keyof typeof target];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop, value) {
        const oldTarget = { ...target };
        target[prop as keyof typeof target] = value;

        // Запускаем обновление компоненты
        // Плохой cloneDeep, в следующей итерации нужно заставлять добавлять cloneDeep им самим
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  show() {
    this.getContent()!.style.display = 'block';
  }

  hide() {
    this.getContent()!.style.display = 'none';
  }
}

export default Block;
