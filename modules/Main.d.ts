import type { TRootView } from './View';
import type { TContainer } from './DOMElement';
import { Component } from './Component';
export declare abstract class Main<T extends TRootView> extends Component {
    abstract View: T;
    mountTree(mountPoint: TContainer): void;
}
