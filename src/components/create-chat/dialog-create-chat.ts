import Block from '../../core/Block';
import { connect } from '../../utils/connect';
import { RefType } from '../../type';
import { InputField } from '../input-field/input-field';

interface Props {
    isOpenDialogChat: boolean,
    onSave: () => void,
    onClose: () => void,
    error: string,
    validate: Object
}

type Refs = {
    chatTitle: InputField,
    errorLine: Block<Object, RefType>,
}

export class DialogCreateChat extends Block<Props, Refs> {
  constructor(props: Props) {
    super({
      ...props,
      validate: {
        chat: (value: string) => (value ? '' : 'Наименование не может быть пустым'),
      },
      onClose: () => window.store.set({ isOpenDialogChat: false }),
    });
  }

  public getChatTitle() {
    return this.refs.chatTitle.value();
  }

  public setError(error: string) {
    this.refs.errorLine.setProps({ error });
  }

  protected render(): string {
    return `
            {{#Dialog open=isOpenDialogChat}}    
                    <h1>Создать новую переписку</h1>  
                    {{{ InputField  placeholder='Наименование чата' name='chatTitle' ref='chatTitle' validate=validate.chat}}}                    
                    {{{ Error class='error' ref="errorLine"}}}
                    <div>
                     {{{ Button label="Создать" onClick=onSave class='b-a-c m-t-20 m-b-10 m-t-10' }}}
                     {{{ Button label="Отмена" onClick=onClose class='b-a-c m-t-20 m-b-10 m-t-10 btn-default' }}}
                    </div>
            
            {{/Dialog}}
        `;
  }
}

export const withStoreCreateChat = connect((state) => ({ isOpenDialogChat: state.isOpenDialogChat }))(DialogCreateChat);
