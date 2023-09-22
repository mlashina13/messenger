import Block from "../../core/Block";

interface IProps {
    error: string
}

export class Error extends Block<IProps>{
    constructor(props: IProps) {
        super(props);
    }

    protected render(): string {
        return (`           
                <div class="error">{{error}}</div>         
        `)
    }
}