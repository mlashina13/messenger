import Block from '../../core/Block';
import { connect } from '../../utils/connect';
import { IProps } from '../registration/registration';
import { navigation } from '../../utils/navigation';
import { RefType, TUser } from '../../type';
import { changeAvatar, changeUser } from '../../services/user';
import { Profile } from '../../components/profile/profile';
import { ErrorType } from '../../api/type';
import { LoadPhoto } from '../../components/load-photo/load-photo';

export interface IProp {
  title: string
  user: TUser;
  onCancel: () => void;
  openDialog: (e: Event) => void;
  loadPhoto: (e: Event) => void;
  onSavePhoto: (e: Event) => void;
  onSave: (e: Event) => void;
  validate: Object;
  password: string;
}
export type Refs = {
  loadPhoto: LoadPhoto
  errorLine: Block<Object, RefType>,
  profile: Profile
}

export class ProfilePage extends Block<IProp, Refs> {
  constructor(props: IProps) {
    super({
      ...props,
      validate: {},
      onCancel: () => {
        navigation('/messenger');
      },
      openDialog: (event: Event) => {
        event.preventDefault();
        window.store.set({ isOpenChangePassword: true });
      },
      loadPhoto: (event: Event) => {
        event.preventDefault();
        window.store.set({ isOpenLoadPhoto: true });
      },
      onSavePhoto: (event: Event) => {
        event.preventDefault();
        const photo = this.refs.loadPhoto.getPhoto();
        if (photo && photo?.files?.length) {
          const formData = new FormData();
          formData.append('avatar', photo.files[0]);
          changeAvatar(formData)
            .then(() => {
              window.store.set({ isOpenLoadPhoto: false });
            })
            .catch((error: XMLHttpRequest) => {
              this.refs.errorLine.setProps({ error: (error?.response as ErrorType).reason });
            });
        }
      },
      onSave: (event: Event) => {
        event.preventDefault();
        const user = this.refs.profile.getUser();
        changeUser(user)
          .then(() => {
            navigation('/messenger');
          })
          .catch((error: XMLHttpRequest) => {
            this.refs.errorLine.setProps({ error: (error?.response as ErrorType).reason });
          });
      },

    });
  }

  render() {
    return (`{{# Form class='block'}}
              <div class="b-flex m-b-10">
                {{{ Logo class='col-60'}}}        
                <div>
                 {{#if user.avatar}}
                      <img class="avatar-photo" src="{{user.avatar}}"/>
                 {{else}}   
                    <div class="no-photo float-rigth m-b-10">NO PHOTO</div>
                 {{/if}}                  
                 {{{ Button label='Изменить фото' onClick=loadPhoto class='b-a-c m-t-20 m-b-10 m-t-10 btn-link'}}} 
                 {{{ LoadPhoto ref="loadPhoto" onSave=onSavePhoto}}}
                </div>                
              </div>
              <h1>Профиль</h1>
              <div class="col-80 b-a-c">
                {{{ Profile user=user ref="profile" }}} 
                {{{ Button label='Изменить пароль' onClick=openDialog class='b-a-c m-t-20 m-b-10 m-t-10'}}}
                {{{ ChangePassword  ref="changePassword"}}}               
                {{{ Button label='Сохранить изменения' onClick=onSave class='b-a-c m-t-20 m-b-10 m-t-10'}}}
                {{{ Button label='Отмена' onClick=onCancel class='b-a-c m-t-20 m-b-10 m-t-10 btn-default'}}}
              <div>{{{ Error class='error' ref="errorLine"}}} </div>
              </div>
          {{/Form}}`);
  }
}
export default connect(({ user }) => ({ user }))(ProfilePage);
