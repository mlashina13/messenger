import Block from '../../core/Block';
import { TMessage } from '../../type';
import { connect } from '../../utils/connect';
import { Chat } from '../chat/chat';

export interface IProps {
    events: { click: () => void };
    class: string;
    ownerText: string;
    answerText: string
    onClick: () => void;
    message: TMessage;
}

type Refs = {}

export class Message extends Block<IProps, Refs> {
  constructor(props: IProps) {
    super(props);
  }

  protected render(): string {
    return (`
           <div class="message {{message.class}}">{{message.message}}</div>
           `);
  }
}
export const withStoreMessages = connect((state) => ({ messages: state.messages }))(Chat);
