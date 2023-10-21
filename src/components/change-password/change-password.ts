import Block from '../../core/Block';
import { validationPassword } from '../../core/validations';
import { InputField } from '../input-field/input-field';
import { connect } from '../../utils/connect';
import { changePassword } from '../../services/user';
import { ErrorType } from '../../api/type';
import { RefType } from '../../type';

export interface IProps {
  validate: Object;
  isOpenChangePassword: boolean,
  onSave: (e: Event) => void,
  onClose: () => void,
  error: string,
}

export type Refs = {
  password: InputField,
  errorLine: Block<Object, RefType>,
  oldPassword: InputField;
  newPassword: InputField;
}

export class ChangePassword extends Block<IProps, Refs> {
  constructor(props: IProps) {
    super({
      ...props,
      validate: {
        password: (value: string) => validationPassword(value),
      },
      onClose: () => window.store.set({ isOpenChangePassword: false }),
      onSave: (event: Event) => {
        event.preventDefault();
        const oldPassword = this.refs.oldPassword.value();
        const newPassword = this.refs.newPassword.value();
        if (oldPassword && newPassword) {
          changePassword({ oldPassword, newPassword })
            .then(() => {
              window.store.set({ isOpenChangePassword: false });
            })
            .catch((error: XMLHttpRequest) => {
              this.refs.errorLine.setProps({ error: (error?.response as ErrorType).reason });
            });
        }
      },
    });
  }

  render() {
    return (`{{#Dialog open=isOpenChangePassword}}    
              <h1>Изменение пароля</h1>  
              {{{ InputField type='password' placeholder='Старый пароль' name='oldPassword' ref='oldPassword' validate=validate.password}}}
              {{{ InputField type='password' placeholder='Новый пароль' name='newPassword'  ref='newPassword' validate=validate.password}}}
              <div>{{{ Error class='error' ref="errorLine"}}} </div>
               <div>
                 {{{ Button label="Изменить" onClick=onSave class='b-a-c m-t-20 m-b-10 m-t-10' }}}
                 {{{ Button label="Отмена" onClick=onClose class='b-a-c m-t-20 m-b-10 m-t-10 btn-default' }}}
                </div>
                
             {{/Dialog}}`);
  }
}
export const withStoreDialogChangePassword = connect((state) => ({ isOpenChangePassword: state.isOpenChangePassword }))(ChangePassword);
