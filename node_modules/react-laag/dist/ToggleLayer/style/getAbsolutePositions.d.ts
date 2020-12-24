/// <reference types="react" />
import { Rects, AnchorEnum } from "../types";
declare type GetAbsolutePositionsArgs = {
    anchor: AnchorEnum;
    rects: Rects;
    scrollTop: number;
    scrollLeft: number;
    triggerOffset: number;
    offsetSecondary: number;
};
export default function getAbsolutePositions({ anchor, rects, triggerOffset, offsetSecondary, scrollLeft, scrollTop }: GetAbsolutePositionsArgs): import("react").CSSProperties;
export {};
