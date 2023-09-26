import Block from '../../core/Block';
import {
  validationName,
  validationEmail,
  validationLogin,
  validationPassword,
  validationPhone,
} from '../../core/validations';
import { ProfileInterface } from './model/profile.interface';

export interface IProps {
    title: string,
    validate: Object,
    onSave: (e: Event) => void
}

export class Profile extends Block<IProps> {
  constructor(props: IProps) {
    super({
      ...props,
      validate: {
        login: (value: string) => validationLogin(value),
        password: (value: string) => validationPassword(value),
        name: (value: string) => validationName(value),
        email: (value: string) => validationEmail(value),
        phone: (value: string) => validationPhone(value),
      },
      onSave: (event: Event) => {
        event.preventDefault();
        const reg: ProfileInterface = {
          email: this.refs.email.value(),
          first_name: this.refs.first_name.value(),
          second_name: this.refs.second_name.value(),
          phone: this.refs.phone.value(),
          login: this.refs.login.value(),
          password: this.refs.password.value(),
        };
        console.log(reg);
      },

    });
  }

  render() {
    return (`<main>    
       {{# Form class='block'}}
        <div class="b-flex m-b-10">
            {{{ Logo class='col-60'}}}
            {{{ Link href="/" name='Загрузить фото' class='col-40'}}}
        </div>
        <h1>{{title}}</h1>
        <div class="col-80 b-a-c">
            {{{ InputField type='text' placeholder='Почта' name='email' ref='email'  validate=validate.email}}}
            {{{ InputField type='text' placeholder='Логин' name='login' ref='login' validate=validate.login}}}
            {{{ InputField type='text' placeholder='Имя' name='first_name' ref='first_name' validate=validate.name}}}
            {{{ InputField type='text' placeholder='Фамилия' name='second_name' ref='second_name' validate=validate.name}}}
            {{{ InputField type='text' placeholder='Телефон' name='phone' ref='phone' validate=validate.phone}}}
            {{{ InputField type='password' placeholder='Пароль' name='password' ref='password' validate=validate.password}}}
            {{{ InputField type='password' placeholder='Повторить пароль' name='retryPassword' ref='retryPassword' validate=validate.password}}}
            {{{ Button label='Сохранить' onClick=onSave class='b-a-c m-t-20 m-b-10 m-t-10'}}}
        </div>
        {{/Form}}</main>`);
  }
}
