import { Block } from '../../core/Block';
import { connect } from '../../utils/connect';
import { navigation } from '../../utils/navigation';
import { RefType, TUser } from '../../type';
import { signup } from '../../services/auth';
import { Profile } from '../../components';
import { validationPassword, validationRetryPassword } from '../../core/validations';
import { InputField } from '../../components/input-field/input-field';

export interface IProps {
  title: string,
  user: TUser,
  password: string;
  onCancel: () => void
  onSave: (e: Event) => void;
  validate: Object;
}

export type Refs = {
  profile: Profile,
  errorLine: Block<Object, RefType>,
  password: InputField
}

export class RegistrationPage extends Block<IProps, Refs> {
  constructor(props: IProps) {
    super({
      ...props,
      validate: {
        password: (value: string) => validationPassword(value),
        retryPassword: (value: string) => validationRetryPassword(this.refs.password.value() as string, value),
      },
      onCancel: () => {
        navigation('/login');
      },
      onSave: (event: Event) => {
        event.preventDefault();
        const user: TUser = this.refs.profile.getUser() as TUser;
        // validationPassword(value),
        user.password = this.refs.password.value();
        signup(user).then(() => {
          window.store.set({ user });
          navigation('/messenger');
        }).catch((error: string) => {
          this.refs.errorLine.setProps({ error });
        });
      },
    });
    // initUserPage();
  }

  render() {
    return (`
     {{# Form class='block'}}           
        <div class="b-flex m-b-10">
            {{{ Logo class='col-60'}}}
        </div> 
        <h1>Регистрация</h1>
        <div class="col-80 b-a-c">
            {{{ Profile user=user ref='profile'}}}
            {{{ InputField type='password' placeholder='Пароль' name='password' ref='password' validate=validate.password}}}
            {{{ InputField type='password' placeholder='Повторить пароль' name='retryPassword' ref='retryPassword'  validate=validate.retryPassword}}}
            {{{ Button label='Сохранить' onClick=onSave class='b-a-c m-t-20 m-b-10 m-t-10'}}}
            {{{ Button label='Отмена' onClick=onCancel class='b-a-c m-t-20 m-b-10 m-t-10'}}}      
            <div>{{{ Error class='error' ref="errorLine"}}} </div>
        </div>
        {{/Form}}`);
  }
}
export default connect(({ user }) => ({ user }))(RegistrationPage);
