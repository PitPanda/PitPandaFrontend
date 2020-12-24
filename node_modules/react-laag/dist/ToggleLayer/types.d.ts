import { ReactNode } from "react";
/**
 * Client Rect stuff
 */
export declare type Rects = {
    trigger: ClientRect;
    relativeParent: ClientRect;
    layer: ClientRect;
    arrow: ClientRect;
    scrollParents: ClientRect[];
};
/**
 * Anchor stuff
 */
export declare type AnchorEnum = "BOTTOM_LEFT" | "BOTTOM_RIGHT" | "BOTTOM_CENTER" | "TOP_LEFT" | "TOP_RIGHT" | "TOP_CENTER" | "LEFT_BOTTOM" | "LEFT_TOP" | "LEFT_CENTER" | "RIGHT_BOTTOM" | "RIGHT_TOP" | "RIGHT_CENTER" | "CENTER";
export declare type Primary = Exclude<Side, "CENTER">;
export declare type Side = "TOP" | "BOTTOM" | "LEFT" | "RIGHT" | "CENTER";
export declare type Direction = "Y" | "X";
export declare type PreferedX = "LEFT" | "RIGHT";
export declare type PreferedY = "TOP" | "BOTTOM";
export declare type OffsetSide = "left" | "right" | "top" | "bottom";
export declare type LayerSide = OffsetSide | "center";
export declare type RenderLayerProps = {
    layerProps: {
        ref: (element: HTMLElement | null) => void;
        style: React.CSSProperties;
    };
    arrowStyle: React.CSSProperties;
    layerSide: LayerSide;
    triggerRect: ClientRect | null;
    isOpen: boolean;
    close: () => void;
};
export declare type RenderLayer = (props: RenderLayerProps) => ReactNode;
export declare type LayerDimensions = (layerSide: LayerSide) => {
    width: number;
    height: number;
} | {
    width: number;
    height: number;
};
export declare type Placement = {
    anchor?: AnchorEnum;
    triggerOffset?: number;
    scrollOffset?: number;
    arrowOffset?: number;
    possibleAnchors?: AnchorEnum[];
    autoAdjust?: boolean;
    snapToAnchor?: boolean;
    preferX?: PreferedX;
    preferY?: PreferedY;
    layerDimensions?: LayerDimensions | null;
};
export declare type ResultingStyles = {
    layer: React.CSSProperties;
    arrow: React.CSSProperties;
    layerSide: LayerSide;
};
export declare type DisappearType = "partial" | "full";
export declare type OnStyle = (layerStyle: React.CSSProperties, arrowStyle: React.CSSProperties, layerSide: LayerSide) => void;
export declare type Container = HTMLElement | (() => HTMLElement);
export declare type ToggleLayerOptions = {
    placement?: Placement;
    onStyle?: OnStyle;
    closeOnOutsideClick?: boolean;
    closeOnDisappear?: DisappearType;
    ResizeObserver?: any;
    fixed?: boolean;
    container?: Container;
    environment?: Window;
};
