declare abstract class Store<T extends object> {
    protected abstract fields: T;
    forEach<K extends keyof T, M extends K>(callback: (arg: T[M], key: M) => void): void;
    get<K extends keyof T, M extends K>(key: M): T[M];
    getAll(): T;
    set<K extends keyof T, M extends K>(key: M, value: T[M]): this;
    abstract push(arg: any): void;
    abstract pop(): void;
}
export declare class StoreForArrays<T> extends Store<Array<T>> {
    fields: T[];
    constructor(...fields: T[]);
    push(value: T): void;
    pop(): void;
}
export declare class StoreForObjects<T extends object = object> extends Store<T> {
    fields: T;
    constructor(fields?: T);
    push(value: object): void;
    pop(): void;
}
export {};
