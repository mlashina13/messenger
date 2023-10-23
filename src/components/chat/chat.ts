import Block from '../../core/Block';
import { ChatDTO, TToken } from '../../api/type';
import { getTokenService } from '../../services/chat';
import { RefType, TMessage, TUser } from '../../type';
import { WebSocketTransport, WSEvents } from '../../core/wsTransport';
import { connect } from '../../utils/connect';

export interface IProps {
    events: { click: (e: Event) => void };
    class: string;
    label: string;
    selectChat: (e: Event) => void;
    chat: ChatDTO;
    user: TUser;
    active: boolean;
}

export type Refs = {
   errorLine: Block<Object, RefType>,
}

export class Chat extends Block<IProps, Refs> {
  private onChangeMessageCallback: (data: TMessage) => void;

  constructor(props: IProps) {
    super(props);

    this.props.events = {
      click: (event: Event) => {
        const { store } = window;
        const { chat } = this.props;
        const userId = store?.getState()?.user?.id;
        event.preventDefault();
        const chatItems = document.getElementsByClassName('chat active');
        for (let i = 0; i < chatItems.length; i++) {
          chatItems[i].classList.remove('active');
        }
        this.props.active = true;
        store.set({ blockMessage: false });

        this.onChangeMessageCallback = (data: TMessage | TMessage[]) => {
          const newMessage = [];
          const oldMessage = store.getState()?.messages;
          if (data instanceof Array) {
            data.forEach((message) => {
              newMessage.push({ class: message?.user_id === userId ? 'owner' : 'answer', message: message.content });
            })
          } else {
            let type = data?.user_id === userId ? 'owner' : 'answer';
            if (data?.type === 'user connected') {
              data.content = `Пользователь ${data.content} вошел в чат`;
              type = 'join-user';
            }
            newMessage.push({ class: type, message: data.content });
          }
          const messages = [...oldMessage, ...newMessage];
          store.set({ messages });
        };

        if (chat?.id) {
          getTokenService(chat.id).then((resp:TToken) => {
            store.set({ socket: new WebSocketTransport(`/${userId}/${chat.id}/${resp?.token}`) });
            const socket = store.getState()?.socket;
            if (socket) {
              socket.connect().then(() => {
                socket.send({ content: '0', type: 'get old' });
              });
              socket.on(WSEvents.Close, () => {
                socket.close();
                store.set({ blockMessage: true });
                this.refs.errorLine.setProps({ error: 'Соединение прервано' });
              });
              socket.on(WSEvents.Message, this.onChangeMessageCallback);
            }
          }).catch(() => console.log('Ошбика полученя token'));
        }
      },
    };
  }

  protected render(): string {
    return (`
           <li class="chat {{#if active}}active{{/if}}" id="{{chat.id}}" >
                <div>
                {{#if chat.avatar}}
                    <img class="chat-photo" src="{{chat.avatar}}"/>
                 {{else}}   
                    <div class="no-photo">NO PHOTO</div>
                 {{/if}}
                </div>
                <div class="chat-name" title="{{chat.title}}">
                    <a>{{chat.title}}</a>
                </div>
                {{#if chat.unreadCount}}
                    <div class="chat-count">{{chat.unreadCount}}</div>
                {{/if}}
                <div>{{{ Error class='error' ref="errorLine"}}}</div>                
            </li>`);
  }
}
export const withStoreActiveChat = connect((state) => ({ blockMessage: state.blockMessage }))(Chat);
