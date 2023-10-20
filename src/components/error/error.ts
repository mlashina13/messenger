import Block from '../../core/Block';

export interface IProps {
    error: string
    class: string;
}

export type Refs = {}

export class Error extends Block<IProps, Refs> {
  constructor(props: IProps) {
    super(props);
  }

  protected render(): string {
    return (`           
                <div class='error'>{{error}}</div>         
        `);
  }
}
