import Block from '../../core/Block';
import { registerHelper, render } from '../../core/registerHelper';
import { registerComponent } from '../../core/resgiterComponent';
import { Profile } from '../../components/profile/profile';
interface IProp {
  title: string
}

export class ProfilePage extends Block<IProp> {
  constructor() {
    super();
  }

  render() {
    return ('{{{ Profile title=\'Профиль\'}}}');
  }
}

registerHelper();
registerComponent('Profile', Profile);
const profilePage = new ProfilePage();
render('#app', profilePage);
