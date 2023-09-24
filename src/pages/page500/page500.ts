import Block from '../../core/Block';
import { registerHelper, render } from '../../core/registerHelper';
import { registerComponent } from '../../core/resgiterComponent';

export interface IProp {
}

export class Page500 extends Block<IProp> {
  constructor() {
    super();
  }

  render() {
    return (`<div>
    {{#> Form class='block'}}
        <div class="b-flex m-b-10">
            {{> Logo class='col-40'}}
            <h1 class="col-60">
                <div class="x36-size m-b-10">500</div>
                <div>Произошла ошибка</div>
            </h1>
        </div>
        <div class="m-t-20"> <a class="custom-st-href x12-size" href="/">Назад</a></div>
    {{/Form}}
</div>`);
  }
}

registerHelper();
registerComponent('Page500', Page500);
const page500 = new Page500();
render('#app', page500);
