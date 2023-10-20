import Block from '../../core/Block';
import { RefType } from '../../type';

type TList = {
  id: string,
  title: string,
  active: boolean
}

export interface IProps {
  list: TList[];
  value: string;
  error: string;
  events: {
    change: (e: Event) => void
  };
  onChange: () => void;
  validate(value: string): string;
}

export type Refs = {
  select: Block<{value: string}, RefType>,
  errorLine: Block<Object, RefType>,
}

export class Select extends Block<IProps, Refs> {
  constructor(props: IProps) {
    super({
      ...props,
      events: {
        change: props.onChange || (() => {}),
      },
    });
  }

  public getChatId() {
    return this.props.list.find((item) => item.active);
  }

  /* public value() {
    if (!this.validate()) {
      return '';
    }
    return  this.refs.select ;
  }

  private validate() {
    const error = this.props?.validate(this.refs.select.value());
   // const error = this.props?.validate(this.refs.select)
    if (!error) {
      this.refs.errorLine.setProps({ error } as IProps);
      return false;
    }
    this.refs.errorLine.setProps({ error: '' } as IProps);
    return true;
  } */

  protected render(): string {
    return (`<div>
            <select>
               <option></option>
               {{#each list}}
                     <option value="{{this.id}}">{{this.title}}</option> 
                {{/each}}
            </select>    
            {{{ Error error=error ref="errorLine"}}}  
        </div>
        `);
  }
}
