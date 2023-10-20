import Block from '../../core/Block';
import { connect } from '../../utils/connect';
import { RefType } from '../../type';
import { InputField } from '../input-field/input-field';

export interface IProps {
  isOpenLoadPhoto: boolean,
  onSave: (e: Event) => void,
  onClose: () => void,
  error: string
}

export type Refs = {
  errorLine: Block<Object, RefType>,
  loadPhoto: InputField
}

export class LoadPhoto extends Block<IProps, Refs> {
  constructor(props: IProps) {
    super({
      ...props,
      onClose: () => window.store.set({ isOpenLoadPhoto: false }),
    });
  }

  public getPhoto() {
    return this.refs.loadPhoto.getContent() as HTMLInputElement;
  }

  render() {
    return (`{{#Dialog open=isOpenLoadPhoto}}    
              <h1>Изменение пароля</h1>  
               {{{Input type='file' placeholder='Загрузить фото' name='loadPhoto' ref='loadPhoto' }}}
               <div>
                 {{{ Button label="Сохранить" onClick=onSave class='b-a-c m-t-20 m-b-10 m-t-10' }}}
                 {{{ Button label="Отмена" onClick=onClose class='b-a-c m-t-20 m-b-10 m-t-10 btn-default' }}}
                </div>
                <div>{{{ Error class='error' ref="errorLine"}}} </div>
             {{/Dialog}}`);
  }
}
export const withStoreDialogLoadPhoto = connect((state) => ({ isOpenLoadPhoto: state.isOpenLoadPhoto }))(LoadPhoto);
