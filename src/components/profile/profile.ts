import Block from '../../core/Block';
import {
  validationName,
  validationEmail,
  validationLogin,
  validationPhone,
} from '../../core/validations';
import { InputField } from '../input-field/input-field';
import { TUser } from '../../type';

export interface IProps {
  title: string,
  validate: Object
  email:string
 // onSave: (e: Event) => void
 // onCancel: () => void
  user: TUser,
  events: {
    click: (e: Event) => void
  }
}

export type Refs = {
  email: InputField,
  login: InputField,
  first_name: InputField,
  second_name: InputField,
  phone: InputField,
  password: InputField,
}

export class Profile extends Block<IProps, Refs> {
  constructor(props: IProps) {
    super({
      ...props,
      validate: {
        login: (value: string) => validationLogin(value),
        name: (value: string) => validationName(value),
        email: (value: string) => validationEmail(value),
        phone: (value: string) => validationPhone(value),
      },
      events: {
        click: () => {

        },
      },
    });
  }

  public getUser() {
    return {
      email: this.refs.email.value(),
      first_name: this.refs.first_name.value(),
      second_name: this.refs.second_name.value(),
      phone: this.refs.phone.value(),
      login: this.refs.login.value(),
    };
  }

  render() {
    return (`<div>       
            {{{ InputField type='text' placeholder='Почта' name='email' value=user.email ref='email'  validate=validate.email}}}
            {{{ InputField type='text' placeholder='Логин' name='login' value=user.login ref='login' validate=validate.login}}}
            {{{ InputField type='text' placeholder='Имя' name='first_name' value=user.first_name  ref='first_name' validate=validate.name}}}
            {{{ InputField type='text' placeholder='Фамилия' name='second_name' value=user.second_name ref='second_name' validate=validate.name}}}
            {{{ InputField type='text' placeholder='Телефон' name='phone' value=user.phone ref='phone' validate=validate.phone}}}
            </div>`);
  }
}
