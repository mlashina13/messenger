import Block from '../../core/Block';

export interface IProps {
    class: string,
}

export type Refs = {}

export class Form extends Block<IProps, Refs> {
  constructor(props: IProps) {
    super(props);
  }

  protected render(): string {
    return ('<formx class="{{class}}">{{ @partial-block }}</formx>');
  }
}
