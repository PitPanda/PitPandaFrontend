/// <reference types="react" />
import { ResultingStyles } from "./types";
export declare const EMPTY_STYLE: React.CSSProperties;
export declare function isSet<T>(value: T): boolean;
export declare function shouldUpdateStyles(prev: ResultingStyles, next: ResultingStyles): boolean;
export declare function getWindowClientRect(environment?: Window): ClientRect;
export declare function getContentBox(element: HTMLElement, environment?: Window): {
    width: number;
    height: number;
};
export declare function clientRectToObject(clientRect: ClientRect): ClientRect;
export declare function getElementFromAnchorNode(anchorNode: Node): HTMLElement | null;
export declare function minMax(value: number, { min, max }: {
    min: number;
    max: number;
}): number;
