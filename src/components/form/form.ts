import Block from '../../core/Block';

export interface IProps {
    class: string,
}

export class Form extends Block<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  protected render(): string {
    return ('<form class="{{class}}">{{ @partial-block }}</form>');
  }
}
