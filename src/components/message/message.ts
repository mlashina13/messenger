import Block from "../../core/Block";

interface IProps {
    events: { click: () => void };
    class: string;
    ownerText: string;
    answerText: string
    onClick: () => void;
}


export class Message extends Block<IProps> {
    constructor(props: IProps) {
        super(props);
        this.props.events = {
            click: this.props.onClick || (() => {})
        }
    }

    protected render(): string {
        return (`
           <div class="message {{message.class}}">{{message.message}}</div>
           `)
    }
}
