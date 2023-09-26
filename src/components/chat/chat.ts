import Block from '../../core/Block';

export interface IProps {
    events: { click: () => void };
    class: string;
    label: string;
    onClick: () => void;
}

export class Chat extends Block<IProps> {
  constructor(props: IProps) {
    super(props);
    this.props.events = {
      click: this.props.onClick || (() => {}),
    };
  }

  protected render(): string {
    return (`
           <li class="chat {{chat.active}}">
                <div>
                    <img class="chat-photo" src="{{chat.photo}}"/>
                </div>
                <div class="chat-name" title="{{chat.name}}">
                    <a href="{{chat.url}}">{{chat.name}}</a>
                </div>
                {{#if chat.count}}
                    <div class="chat-count">{{chat.count}}</div>
                {{/if}}
            </li>`);
  }
}
