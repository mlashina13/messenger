import Block from '../../core/Block';
import { registerHelper, render } from '../../core/registerHelper';
import { registerComponent } from '../../core/resgiterComponent';

interface IProp {
}
export class Page404 extends Block<IProp> {
  constructor() {
    super();
  }

  render() {
    return (`<div>
 {{#> Form class='block'}}
        <div class="b-flex m-b-10">
            {{> Logo class='col-40'}}
            <h1 class="col-60">
                <div class="x36-size m-b-10">404</div>
                <div>Страницы не существует</div>
            </h1>
        </div>
        <div> <a class="custom-st-href x12-size" href="/">Назад</a></div>
    {{/Form}}
</div>`);
  }
}

registerHelper();
registerComponent('Page404', Page404);
const page404 = new Page404();
render('#app', page404);
