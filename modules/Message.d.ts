import { StoreForObjects, StoreForArrays } from "./Store";
export declare class Sender {
    recipients: StoreForArrays<TRecipient>;
    sendMessage(message: string): void;
    addRecipient(recipient: TRecipient): this;
}
export declare type handlers = {
    [index: string]: () => void;
};
export declare type TRecipient = Recipient<handlers>;
export declare class Recipient<T extends handlers> {
    handlers: StoreForObjects<T>;
    context: object;
    constructor(context: object, handlers: T, senders?: Sender[]);
    getMessage<K extends keyof T, M extends K>(message: M | string): void;
    addSender(sender: Sender): this;
}
