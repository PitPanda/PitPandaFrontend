import * as React from "react";
import { Props } from "../ToggleLayer";
import { RenderResult } from "@testing-library/react";
declare type ToggleLayerProps = Omit<Props, "renderLayer" | "children">;
export declare const TRIGGER_DIMENSIONS: {
    width: number;
    height: number;
};
export declare const LAYER_DIMENSIONS: {
    height: number;
    width: number;
};
export declare const CONTAINER_DIMENSIONS: {
    width: number;
    height: number;
};
export declare const SCROLLBOX_DIMENSIONS: {
    width: number;
    height: number;
    margin: number;
};
export declare function ToggleLayerTest(props?: ToggleLayerProps): JSX.Element;
export declare function ScrollBox({ children, testId }: {
    children: React.ReactNode;
    testId?: string;
}): JSX.Element;
export declare function scrollToCenter(element: HTMLElement): void;
export declare function scroll(element: HTMLElement, x: number, y: number): void;
declare type Side = "top" | "left" | "right" | "bottom";
export declare function getLayerStyle(layer: HTMLElement): Record<Side, number | null>;
export declare function expectLayerStyle(layer: HTMLElement, style: Partial<Record<Side, number>>): void;
export declare const wait: (ms: number) => Promise<unknown>;
export declare const nextFrame: () => Promise<unknown>;
export declare function centerAndTrigger(tools: RenderResult): HTMLElement;
export declare function ignoreWindowErrors(test: () => void): void;
export declare function ignoreWindowErrorsCallback(test: () => void, callback: any): void;
export {};
