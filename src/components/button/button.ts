import Block from '../../core/Block';

export interface IProps {
  events: {
        click: () => void
    };
  class: string;
  label: string;
  onClick: () => void;
  disabled: boolean;
}

type Refs = {}

export class Button extends Block<IProps, Refs> {
  constructor(props: IProps) {
    super(props);
    this.props.events = {
      click: this.props.onClick || (() => {}),
    };
  }

  protected render(): string {
    return (`
           <button class="btn {{#if disabled}}disabled{{/if}} {{class}}"  {{#if disabled}}disabled{{/if}}>{{label}}</button>
        `);
  }
}
