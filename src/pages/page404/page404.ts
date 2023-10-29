import Block from '../../core/Block';

export interface IProp {}

type Refs = {}
export class Page404 extends Block<IProp, Refs> {
  constructor() {
    super();
  }

  render() {
    return (`<main>{{# Form class='block'}}
        <div class="b-flex m-b-10">
            {{{ Logo class='col-40'}}}
            <h1 class="col-60">
                <div class="x36-size m-b-10">404</div>
                <div>Страницы не существует</div>
            </h1>
        </div>
        <div> <a class="custom-st-href x12-size" href="/">Назад</a></div>
    {{/Form}}</main>`);
  }
}
