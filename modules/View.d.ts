import { DOMElement, TContainer as TC, ClassesDOMStream, AttributesDOMStream, ITemplate } from './DOMElement';
import { Component } from './Component';
import { StoreForArrays } from './Store';
declare type TViewNode = AbstractView<TC>;
interface ISimpleViewTemplate extends ITemplate {
    readonly name?: string;
}
declare abstract class AbstractView<T extends TC> extends Component {
    name?: string;
    readonly abstract element: DOMElement<T>;
    children?: TViewNode[];
    protected createDOMElement(template: ITemplate): DOMElement<T>;
    containerProp<K extends keyof T>(prop: K, value?: T[K]): T[K];
    get container(): T;
    mounted?(): void;
}
declare class SimpleView<T extends TC> extends AbstractView<T> {
    readonly element: DOMElement<T>;
    readonly classes: ClassesDOMStream;
    readonly attributes: AttributesDOMStream;
    constructor(template: ISimpleViewTemplate);
}
export declare abstract class View<T extends TC> extends AbstractView<T> {
    readonly events?: ViewEvents;
    setName(newName: string): this;
    createSimpleView<T extends TC>(template: ISimpleViewTemplate): SimpleView<T>;
    bindEvents(...events: TEvent[]): ViewEvents;
    getChild(name: string): TViewNode | undefined;
    protected treeTrevesal(handler: (node: TViewNode) => void, tree: View<TC>): void;
}
export declare type TEvent = {
    readonly name: string;
    readonly block: TC | Document | Window;
    readonly callback: Function;
    readonly capture?: boolean;
};
export declare class ViewEvents extends StoreForArrays<TEvent> {
    readonly Context: object;
    constructor(Context: object, ...events: TEvent[]);
    private addEvent;
    private removeEvent;
    push(event: TEvent): void;
    pop(): void;
}
export declare type TRootView = RootView<TC>;
export declare abstract class RootView<T extends TC> extends View<T> {
    private hooks;
    buildView(): void;
    private appendChild;
    runMountedHooks(): void;
}
export {};
