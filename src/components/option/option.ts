import Block from '../../core/Block';
import { Chat } from '../chat/chat';
import { RefType } from '../../type';

export interface IProps {
  chats: Chat[];
  selectChat: string;
  value: string;
  error: string;
  events: {
    change: (e: Event) => void
  };
  onChange: () => void;
  validate(value: string): string;
}

export type Refs = {
  select: Block<Object, RefType>,
  errorLine: Block<Object, RefType>,
}

export class Option extends Block<IProps, Refs> {
  constructor(props: IProps) {
    super({
      ...props,
      events: {
        change: props.onChange || (() => {
        }),
      },
    });
  }

  protected render(): string {
    return (` <option value="{{chat.id}}">{{chat.title}}</option> 
           
        `);
  }
}
