import Block from '../../core/Block';
import { registerHelper, render } from '../../core/registerHelper';
import { registerComponent } from '../../core/resgiterComponent';
import { Chat } from '../../components/chat/chat';
import { Message } from '../../components/message/message';

export interface IProp {
    validate?: Object,
    onSend?: (event: Event) => void,
    chats: Object;
    messages: Object;
}

export class ChatPage extends Block<IProp> {
  constructor(prop: IProp) {
    super({
      ...prop,
      validate: {
        message: (value: string) => (value ? '' : 'Сообщение не может быть пустым'),
      },
      onSend: (event) => {
        event.preventDefault();
        const message = this.refs.message.value();
        console.log({ message });
      },
    });
  }

  render() {
    return (`<main> {{# Form class="block-chat" }}
            <div class="b-orange">
                <div class="b-flex m-10">
                    {{{ Logo class='col-60'}}}
                    <div class="col-60">
                        <div>
                            {{{ Link href="/pages/profile/profile.html" name='Профиль' class='t-a-с'}}}
                        </div>
                        <div class="m-t-20 t-a-r">
                            <a class="col-40 custom-st-href" href="/">Выход</a>
                        </div>
                    </div>
                </div>            
                <ul>
                    {{#each chats}}
                        {{{ Chat chat=.}}}
                    {{/each}}
                </ul>            
            </div>
            <div class="b-red">
            {{#if  messages}}
                {{#each messages}}
                    {{{ Message message=.}}}
                {{/each}}
                 <div class="b-flex message-btn">
                    <div class='col-70'>{{{ InputField type='text' placeholder='Введите сообщение' name='message' ref='message' validate=validate.message}}}</div>
                    <div class='col-30'>{{{ Button label='Отправить' onClick=onSend class='b-a-c'}}}</div>
                </div> 
             {{else}}
                <div class="t-gray x12-size-size m-t-10 m-l-10">Выберите чат чтобы отправить сообщение</div>
             {{/if}}   
            </div>  
              
        {{/Form}}</main>`);
  }
}

registerHelper();
registerComponent('Chat', Chat);
registerComponent('Message', Message);
const chatPage = new ChatPage({

  chats: [
    {
      name: 'Продажа цветов', count: 20, photo: '/assets/img/photo2.jfif', url: '/pages/page404/page404.html', active: 'active',
    },
    {
      name: 'Береги природу', count: 999, photo: '/assets/img/photo2.jpg', url: '/pages/page404/page404.html',
    },
    { name: 'Родительский коммитет', photo: '/assets/img/photo1.jfif', url: '/pages/page404/page404.html' },
    { name: 'Группа Волшебники, детский сад №27 г. Таганрог, Ростовская обоасти', photo: '/assets/img/photo3.jfif', url: '/pages/page404/page404.html' },
  ],
  messages: [
    { message: 'Вопрос', class: 'owner', date: '19 сентября' },
    { message: 'Ответ', class: 'answer', date: '19 сентября' },
    { message: 'Вопрос', class: 'owner', date: '19 сентября' },
    { message: 'Ответ', class: 'answer', date: '19 сентября' },
  ],

});
render('#app', chatPage);
