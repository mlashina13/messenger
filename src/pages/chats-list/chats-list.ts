import Block from '../../core/Block';
import { logout } from '../../services/auth';
import { connect } from '../../utils/connect';
import { Message } from '../../components/message/message';
import { RefType, TUser } from '../../type';
import { initChatPage } from '../../services/initApp';
import { Chat } from '../../components/chat';
import { addUserToChatService, createChatService, deleteUserToChatService } from '../../services/chat';
import { DialogCreateChat } from '../../components/create-chat/dialog-create-chat';
import { DialogAddUserToChat } from '../../components/add-user/add-user';
import { getUserByLogin } from '../../services/user';
import { ErrorType } from '../../api/type';

export interface IProps {
    validate?: Object,
    select: Object;
    onSend?: (e: Event) => void;
    openDialogChat: (e: Event) => void;
    onCreateChat: (e: Event) => void;
    openDialogUser: (e: Event) => void;
    onAddUserToChat: () => void;
    onRemoveUserToChat: () => void;
    chats: Chat[];
    onLogout: () => void;
    user: TUser,
    messages: Object[];
    message: string;
    disabled: boolean;
    onSelect: () => void,
    error: string
}

export type Refs = {
    chat: Chat;
    messages: Message,
    createChat: DialogCreateChat,
    addUserToChat: DialogAddUserToChat,
    message: Block<Object, RefType>,
    errorLine: Block<Object, RefType>
}

export class ChatPage extends Block<IProps, Refs> {
  constructor(prop: IProps) {
    super({
      ...prop,
      validate: {
        message: (value: string) => (value ? '' : 'Сообщение не может быть пустым'),
        chat: (value: string) => (value ? '' : 'Наименование не может быть пустым'),
      },
      openDialogChat: (event: Event) => {
        event.preventDefault();
        window.store.set({ isOpenDialogChat: true });
      },
      openDialogUser: (event: Event) => {
        event.preventDefault();
        window.store.set({ isOpenDialogAddUser: true });
      },
      onSend: (event) => {
        event.preventDefault();
        const { store } = window;
        const message = this.refs.message.value();
        const socket = store.getState()?.socket;
        if (socket) socket.send({ content: message.toString(), type: 'message' });
        this.refs.message.setProps({ value: '' });
      },
      onCreateChat: () => {
        const chatTitle = this.refs.createChat.getChatTitle();
        if (!chatTitle) {
          this.refs.createChat.setError('Название переписки не может быть пустым');
          return;
        }
        createChatService(chatTitle)
          .then(() => window.store.set({ isOpenDialogChat: false }))
          .catch((error) => this.refs.createChat.setError(error));
      },
      onAddUserToChat: () => {
        const login = this.refs.addUserToChat.getUserLogin();
        const chatId = this.refs.addUserToChat.getChatId();
        if (login && chatId) {
          getUserByLogin(login).then((users: TUser[]) => {
            if (users.length) {
              const userId = users.find((user) => user.login === login)?.id.toString();
              addUserToChatService({ users: userId ? [userId] : [], chatId: +chatId }).then(() => {
                window.store.set({ isOpenDialogAddUser: false });
              });
            } else {
              this.refs.addUserToChat.setError('Такого пользователя не существует');
            }
          }).catch((error: XMLHttpRequest) => {
            this.refs.addUserToChat.setError((error?.response as ErrorType).reason);
          });
        } else {
          this.refs.addUserToChat.setError('Не заполнены обязательные поля');
        }
      },
      onRemoveUserToChat: () => {
        const login = this.refs.addUserToChat.getUserLogin();
        const chatId = this.refs.addUserToChat.getChatId();
        if (login && chatId) {
          getUserByLogin(login).then((users: TUser[]) => {
            if (users.length) {
              const userId = users.find((user) => user.login === login)?.id.toString();
              deleteUserToChatService({ users: userId ? [userId] : [], chatId: +chatId }).then(() => {
                window.store.set({ isOpenDialogAddUser: false });
              }).catch((error: XMLHttpRequest) => {
                this.refs.addUserToChat.setError((error?.response as ErrorType).reason);
              });
            } else {
              this.refs.addUserToChat.setError('Такого пользователя не существует');
            }
          }).catch((error: XMLHttpRequest) => {
            this.refs.addUserToChat.setError((error?.response as ErrorType).reason);
          });
        } else {
          this.refs.addUserToChat.setError('Не заполнены обязательные поля');
        }
      },
      onLogout: () => {
        logout();
      },

    });
    initChatPage();
  }

  render() {
    return (`{{# Form class="block-chat" }}
            <div class="b-orange">
                <div class="b-flex m-10">
                    {{{ Logo class='col-40'}}}
                    <div class="col-80">
                        <h4>{{user.first_name}} {{user.second_name}}</h4>
                        <div>
                            {{{ Link href="/settings" name='Профиль' class='t-a-с'}}}
                        </div>
                        <div class="m-t-20 t-a-r">
                            {{{ Button label='Выход' class='b-a-c m-t-20 m-b-10 m-t-10 logIn btn-link' ref='Button' onClick=onLogout}}}
                        </div>
                        <div> 
                            {{{ Button label='Создать чат' onClick=openDialogChat class='b-a-c m-t-20 m-b-10 m-t-10'}}}
                            {{{DialogCreateChat ref='createChat' onSave=onCreateChat}}}
                        </div>
                        <div> 
                            {{{ Button label='Добавить/удалить пользователя' onClick=openDialogUser  class='b-a-c m-t-20 m-b-10 m-t-10'}}}
                            {{{DialogAddUserToChat ref='addUserToChat' chats=chats onSave=onAddUserToChat onRemove=onRemoveUserToChat}}}
                        </div>                        
                    </div>
                </div>            
                <ul>
                    {{#each chats}}
                        {{{ Chat chat=.  ref='chat' }}}
                    {{/each}}
                </ul>            
            </div>
            <div class="b-red">
                <h4 class="t-gray x12-size-size m-t-10 m-l-10 {{#if blockMessage}}show{{else}}hide{{/if}}"  ">Выберите чат чтобы отправить сообщение</h4>                
                {{#each messages}}
                    {{{ Message message=. ref='message'}}}
                {{/each}}
                <div id="messages"></div>
                 <div class="b-flex message-btn">
                    <div class='col-70'>{{{ InputField type='text' disabled=blockMessage placeholder='Введите сообщение' name='message' ref='message' validate=validate.message}}}</div>
                    <div class='col-30'>{{{ Button label='Отправить' disabled=blockMessage onClick=onSend class='b-a-c'}}}</div>
                </div>  
                <div>{{{ Error class='error' ref="errorLine"}}}</div>
            </div>  
              
        {{/Form}}`);
  }
}

export default connect(({
  user, chats, messages, blockMessage,
}) => ({
  user, chats, messages, blockMessage,
}))(ChatPage);
