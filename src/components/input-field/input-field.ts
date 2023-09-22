import Block from "../../core/Block";

interface IProps {
    type: string,
    placeholder: string,
    name: string,
    error: string,
    class: string,
    onBlur: () => void,
    validate(value: string): string ;
}

export class InputField extends Block<IProps> {
    constructor(props: IProps) {
        super({
            ...props,
            onBlur: () => this.validate(),
            //value: () => {this.value();}
        });

    }

    public value() {
        if (!this.validate()) {
            return '';
        }
        return (this.refs.input.getContent() as HTMLInputElement).value
    }

    private validate() {
        const value = (this.refs.input.getContent() as HTMLInputElement).value
        const error = this.props.validate(value);
        if (error) {
            this.refs.errorLine.setProps({error} as IProps);
            return false;
        }
        this.refs.errorLine.setProps({error: '' } as IProps);
        return true;
    }


    protected render(): string {
        return (`
            <div class="input">
               {{{ Input class=class placeholder=placeholder name=name type=type ref='input' value=value onBlur=onBlur  }}}
               {{{ Error error=error ref="errorLine"}}}
             </div>         
        `)
    }
}
