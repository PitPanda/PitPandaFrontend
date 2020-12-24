/// <reference types="react" />
import { Rects, AnchorEnum, PreferedX, PreferedY, LayerDimensions } from "../types";
export { default as getArrowStyle } from "./getArrowStyle";
declare type GetAutoAdjustStyleArgs = {
    rects: Rects;
    scrollTop: number;
    scrollLeft: number;
    triggerOffset: number;
    scrollOffset: number;
    preferedAnchor: AnchorEnum;
    preferedX: PreferedX;
    preferedY: PreferedY;
    possibleAnchors: AnchorEnum[];
    autoAdjust: boolean;
    snapToAnchor: boolean;
    layerDimensions: LayerDimensions | null;
};
export default function getAbsoluteStyle({ rects, scrollTop, scrollLeft, triggerOffset, scrollOffset, possibleAnchors, preferedAnchor, preferedX, preferedY, autoAdjust, snapToAnchor, layerDimensions }: GetAutoAdjustStyleArgs): {
    layerStyle: React.CSSProperties;
    layerRect: ClientRect;
    anchor: AnchorEnum;
};
