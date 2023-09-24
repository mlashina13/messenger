import Block from '../../core/Block';
import { registerHelper, render } from '../../core/registerHelper';
import { validationLogin, validationPassword } from '../../core/validations';

export interface IProps {
    onLogin: (event: Event) => void,
    validate: Object
}

export class LoginPage extends Block<IProps> {
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

        console.log({
          login,
          password,
        });
      },
    });
  }

  render() {
    return (`<div class='container'>    
        {{#> Form class='block'}}
          <div class='b-flex m-b-10'>
            {{> Logo class='col-60'}}
            {{{ Link href="/pages/registration/registration.html" name='Регистрация' class='col-40'}}}
          </div>
          <h1>Авторизация</h1>
          <div class='col-80 b-a-c'>
            {{{ InputField type='text' placeholder='Логин' name='login' ref='login'  validate=validate.login}}}
            {{{ InputField type='password' placeholder='Пароль' name='password' ref='password' validate=validate.password}}}
            {{{ Button label='Войти' class='b-a-c m-t-20 m-b-10 m-t-10 logIn' ref='Button' onClick=onLogin}}}
          </div>
          <div class='t-a-c m-b-10'>
            <a class='custom-st-href' href='/pages/page500/page500.html'>Забыли пароль?</a>
          </div>
        {{/Form}}</div>`);
  }
}

registerHelper();
const loginPage = new LoginPage();
render('#app', loginPage);
