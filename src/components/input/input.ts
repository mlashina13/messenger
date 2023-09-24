import Block from '../../core/Block';

export interface IProps {
    class: string,
    type: string,
    placeholder: string,
    name: string,
    value: string,
    onBlur: () => {},
    events: Object
}

export class Input extends Block<IProps> {
  constructor(props: IProps) {
    super({
        ...props,
        events: {
        blur: props.onBlur || (() => {
        }),
        },
    });
  }

  protected render(): string {
    return (`           
               <input class="m-b-10 {{class}}" type="{{type}}" placeholder="{{placeholder}}"  name="{{name}}"  ref="input" value="{{value}}"></input>               
         
        `);
  }
}
