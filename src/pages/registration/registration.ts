import { Block } from '../../core/Block';
import { registerHelper, render } from '../../core/registerHelper';
import { registerComponent } from '../../core/resgiterComponent';
import { Profile } from '../../components/profile/profile';

export interface IProps {
  title: string
}

export class RegistrationPage extends Block<IProps> {
  constructor() {
    super();
  }

  render() {
    return ('{{{ Profile title=\'Регистрация\'}}}');
  }
}

registerHelper();
registerComponent('Profile', Profile);
const registrationPage = new RegistrationPage();
render('#app', registrationPage);
