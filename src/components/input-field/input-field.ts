import Block from '../../core/Block';
import { Input } from '../input/input';
import { Error } from '../error/error';

export interface IProps {
    type: string,
    placeholder: string,
    name: string,
    error: string,
    class: string,
    onBlur: () => void,
    value: string;
    validate(value: string): string ;
}
export type Refs = {
    input: Input;
    errorLine: Error;
}

export class InputField extends Block<IProps, Refs> {
  constructor(props: IProps) {
    super({
      ...props,
      onBlur: () => this.validate(),
    });
  }

  public value() {
    if (!this.validate()) {
      return '';
    }
    return (this.refs.input.getContent() as HTMLInputElement).value;
  }

  private validate() {
    const error = this.props?.validate((this.refs.input.getContent() as HTMLInputElement).value);
    if (error) {
      this.refs.errorLine.setProps({ error } as IProps);
      return false;
    }
    this.refs.errorLine.setProps({ error: '' } as IProps);
    return true;
  }

  protected render(): string {
    return (`
            <div class="input">
               {{{ Input class=class placeholder=placeholder name=name disabled=disabled type=type ref='input' value=value onBlur=onBlur  }}}
               {{{ Error error=error ref="errorLine"}}}
             </div>         
        `);
  }
}
