import { StoreForObjects } from './Store';
import { State, IStateParams, Property } from './State';
import { Sender, Recipient, TRecipient, handlers } from './Message';
declare type TStateUnits = {
    [index: string]: IStateParams<any>;
};
declare type TStateStore<T extends TStateUnits> = {
    [K in keyof T]: State<Property<T[K], 'value'>, T[K]>;
};
export declare abstract class Component {
    readonly states?: StoreForObjects;
    readonly sender?: Sender;
    readonly recipient?: TRecipient;
    setStates<T extends TStateUnits>(states: T): StoreForObjects<TStateStore<T>>;
    setSender(): Sender;
    setRecipient(handlers: handlers, senders?: Sender[]): Recipient<handlers>;
}
export {};
