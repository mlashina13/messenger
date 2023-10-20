import Block from '../../core/Block';
import { connect } from '../../utils/connect';
import { RefType, TChat } from '../../type';
import { InputField } from '../input-field/input-field';
import { Select } from '../select/select';

interface Props {
    isOpenDialogChat: boolean,
    validate: Object,
    onSave: () => void,
    onClose: () => void,
    onGetChat: (e: Event) => void,
    error: string,
    chats: TChat[],
    userId: string;
    activaChat: string;
}

type Refs = {
    userLogin: InputField,
    errorLine: Block<Object, RefType>,
    select: Select,
}

export class DialogAddUserToChat extends Block<Props, Refs> {
  private chatId: number;

  constructor(props: Props) {
    super({
      ...props,
      validate: {
        userLogin: (value: string) => (value ? '' : 'Логин не может быть пустым'),
        checkSelect: (value: string) => (value ? '' : 'Не выбрано наименование чата'),
      },
      onClose: () => window.store.set({ isOpenDialogAddUser: false }),
      onGetChat: (event: Event) => {
        this.chatId = Number((event?.target as HTMLSelectElement)?.value);
      },
    });
  }

  public getUserLogin() {
    return this.refs.userLogin.value();
  }

  public getChatId() {
    return this.chatId;// this.refs.select.value();
  }

  public setError(error: string) {
    this.refs.errorLine.setProps({ error });
  }

  protected render(): string {
    return `
            {{#Dialog open=isOpenDialogAddUser}}    
                    <h1>Добавить пользователя в чат</h1>  
                    {{{ InputField   placeholder='Логин пользователя' name='userLogin' ref='userLogin' validate=validate.userLogin}}}      
                    <div>
                    <div class="m-b-10">Выберите чат</div>
                    <div>{{{Select ref='select' list=chats onChange=onGetChat validate=validate.checkSelect}}}</div>
                     {{{ Error class='error' ref="errorLine"}}}        
                     {{{ Button label="Добавить" onClick=onSave class='b-a-c m-t-20 m-b-10 m-t-10' }}}
                     {{{ Button label="Отмена" onClick=onClose class='b-a-c m-t-20 m-b-10 m-t-10 btn-default' }}}
                    </div>  
                   
            {{/Dialog}}
        `;
  }
}

export const withStoreAddUserToChat = connect((state) => ({ isOpenDialogAddUser: state.isOpenDialogAddUser }))(DialogAddUserToChat);
