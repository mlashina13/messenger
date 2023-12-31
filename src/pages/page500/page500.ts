import Block from '../../core/Block';

export interface IProps {
}
type Refs = {}
export class Page500 extends Block<IProps, Refs> {
  constructor() {
    super();
  }

  render() {
    return (`<main>
    {{# Form class='block'}}
        <div class="b-flex m-b-10">
            {{{Logo class='col-40'}}}
            <h1 class="col-60">
                <div class="x36-size m-b-10">500</div>
                <div>Произошла ошибка</div>
            </h1>
        </div>
        <div class="m-t-20"> <a class="custom-st-href x12-size" href="/">Назад</a></div>
    {{/Form}}
</main>`);
  }
}
