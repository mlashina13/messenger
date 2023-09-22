import Block from "../../core/Block";

interface IProps {
    class: string,
    href: string,
    name: string
}

export class Link extends Block<IProps> {
    constructor(props: IProps) {
        super(props)
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
         
        `)
    }
}
