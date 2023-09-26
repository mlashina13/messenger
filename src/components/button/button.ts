import Block from '../../core/Block';

export interface IProps {
  events: {
        click: () => void
    };

  class: string;

  label: string;

  onClick: () => void;
}

export class Button extends Block<IProps> {
  constructor(props: IProps) {
    super(props);

    this.props.events = {
      click: this.props.onClick || (() => {}),
    };
  }

  protected render(): string {
    return (`
           <button class="btn  {{class}}">{{label}}</button>
        `);
  }
}
