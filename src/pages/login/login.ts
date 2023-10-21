import Block from '../../core/Block';
import { validationLogin, validationPassword } from '../../core/validations';
import {getUser, signin} from '../../services/auth';
import { navigation } from '../../utils/navigation';
import { InputField } from '../../components';
import { ErrorType } from '../../api/type';
import { RefType } from '../../type';

export interface IProps {
    onLogin: (event: Event) => void,
    validate: Object,
    onRegistration: () => void
}

export type Refs = {
  errorLine: Block<Object, RefType>,
  login: InputField,
  password: InputField
}

export class LoginPage extends Block<IProps, Refs> {
  constructor() {
    super({
      validate: {
        login: (value: string) => validationLogin(value),
        password: (value: string) => validationPassword(value),
      },
      onLogin: (event: Event) => {
        event.preventDefault();
        const login = this.refs.login.value();
        const password = this.refs.password.value();
        if (login && password) {
          signin({
            login,
            password,
          }).catch((error: XMLHttpRequest) => {
            getUser().then(() => {
              navigation('/messenger')
            }).catch(() => {
              this.refs.errorLine.setProps({error: (error?.response as ErrorType).reason});
            })
          });
        }
      },
      onRegistration: () => {
        navigation('/sign-up');
      },
    });
  }

  render() {
    return (`<main>    
        {{# Form class='block'}}
          <div class='b-flex m-b-10'>
            {{{ Logo class='col-60'}}}
            {{{ Link href="/sign-up" name='Регистрация' class='col-40'}}}         
          </div>
          <h1>Авторизация</h1>
          <div class='col-80 b-a-c'>
            {{{ InputField type='text' placeholder='Логин' name='login' ref='login'  validate=validate.login}}}
            {{{ InputField type='password' placeholder='Пароль' name='password' ref='password' validate=validate.password}}}
            {{{ Error error=error ref="errorLine"}}}
            {{{ Button label='Войти' class='b-a-c m-t-20 m-b-10 m-t-10 logIn' ref='button' onClick=onLogin}}}           
          </div>
          <div class='t-a-c m-b-10'>
            <a class='custom-st-href' href='/pages/page500/page500.html'>Забыли пароль?</a>
          </div>
        {{/Form}}</main>`);
  }
}
