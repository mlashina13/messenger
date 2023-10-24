import Block from '../../core/Block';

export interface IProps {
    class: string,
    href: string,
    name: string
}

type Refs = {}

export class Link extends Block<IProps, Refs> {
  constructor(props: IProps) {
    super(props);
  }

  protected render(): string {
    return (`           
              <div class="{{class}} link">
                <div>
                    <a href="{{href}}">
                        {{name}}
                    </a>
                </div>
            </div>             
         
        `);
  }
}
