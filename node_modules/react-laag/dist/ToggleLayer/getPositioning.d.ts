import { Placement, ResultingStyles } from "./types";
export declare const defaultPlacement: Required<Placement>;
declare type CalculateStyleProps = {
    triggerRect: ClientRect;
    layerElement: HTMLElement | null;
    relativeParentElement: HTMLElement | null;
    scrollParents: HTMLElement[];
    placement: Placement;
    fixed: boolean | undefined;
    environment?: Window;
};
export default function getPositioning({ triggerRect, layerElement, relativeParentElement, scrollParents, placement, environment, fixed }: CalculateStyleProps): {
    styles: ResultingStyles;
    layerRect: ClientRect;
} | undefined;
export {};
