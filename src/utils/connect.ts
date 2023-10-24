import Block from '../core/Block';
import { StoreEvents } from '../core/Store';
import { TAppState, RefType } from '../type';
import isEqual from '../core/isEqual';

export function connect(mapStateToProps: (state: TAppState) => Partial<TAppState>) {
  return function<P extends object, R extends RefType> (Component: typeof Block<P, R>) {
    return class extends Component {
      private onChangeStoreCallback: () => void;

      constructor(props: P) {
        const { store } = window;
        // сохраняем начальное состояние
        let state = mapStateToProps(store.getState());

        super({ ...props, ...state });

        this.onChangeStoreCallback = () => {
          // при обновлении получаем новое состояние
          const newState = mapStateToProps(store.getState());

          // если что-то из используемых данных поменялось, обновляем компонент
          if (!isEqual(state, newState)) {
            this.setProps({ ...newState as P });
          }

          // сохраняем новое состояние
          state = newState;
        };

        // подписываемся на событие
        store.on(StoreEvents.Updated, this.onChangeStoreCallback);
      }

      componentWillUnmount() {
        super.componentWillUnmount();
        window.store.off(StoreEvents.Updated, this.onChangeStoreCallback);
      }
    };
  };
}
