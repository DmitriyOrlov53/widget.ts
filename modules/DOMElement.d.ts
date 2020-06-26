import { StoreForArrays } from './Store';
export interface ITemplate {
    readonly tag: string;
    readonly classes?: string[];
    readonly attributes?: TAttribute[];
}
export declare type TContainer = HTMLElement | HTMLAudioElement | HTMLImageElement;
declare type TAttribute = {
    readonly name: string;
    readonly value: string;
};
declare type TDOMElement = DOMElement<TContainer>;
export declare class DOMElement<T extends TContainer> {
    readonly container: T;
    readonly classes: ClassesDOMStream;
    readonly attributes: AttributesDOMStream;
    append(container: TContainer): void;
    private parseTemplate;
    constructor(template: ITemplate);
}
declare abstract class DOMStream<T> extends StoreForArrays<T> {
    abstract readonly DOMElement: TDOMElement;
}
export declare class ClassesDOMStream extends DOMStream<string> {
    readonly DOMElement: DOMElement<TContainer>;
    private classList;
    constructor(DOMElment: DOMElement<TContainer>);
    push(_class: string): void;
    pop(): void;
}
export declare class AttributesDOMStream extends DOMStream<TAttribute> {
    readonly DOMElement: DOMElement<TContainer>;
    readonly container: TContainer;
    constructor(DOMElement: DOMElement<TContainer>);
    push(attribute: TAttribute): void;
    pop(): void;
}
export {};
