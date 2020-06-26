export declare type TState<T> = State<T, object>;
export declare type Property<K extends object, T extends keyof K> = K[T];
export interface IStateParams<V> {
    value: V;
    callbacks?: Array<(arg: V) => void>;
    binds?: TState<V>[];
    reverseBinds?: TState<V>[];
}
declare type TValueParams = 'nobind' | 'forcibly';
export declare class State<V, C extends object> {
    protected context: C;
    readonly callbacks: Array<(arg: V) => void>;
    protected cache: V;
    readonly binds: TState<V>[];
    constructor(context: C, params: IStateParams<V>);
    private setBinds;
    private setReverseBinds;
    paramValidator(params: TValueParams[]): (someParam: TValueParams) => boolean;
    value(value?: V, ...params: TValueParams[]): V;
    protected updateBinds(value: V): void;
    addCallbacks(...callbacks: Array<(arg: V) => void>): this;
    setBind(bind: TState<V>): this;
    setReverseBind(bind: TState<V>): this;
}
export {};
