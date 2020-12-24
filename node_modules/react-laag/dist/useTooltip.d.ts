import * as React from "react";
import { Config } from "./useHover";
import { ToggleLayerOptions, RenderLayer } from "./ToggleLayer/types";
declare type Options = Config & ToggleLayerOptions;
export default function useTooltip(renderLayer: RenderLayer, { delayEnter, delayLeave, hideOnScroll, ...rest }?: Options): readonly [React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>, {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onTouchStart: () => void;
    onTouchMove: () => void;
    onTouchEnd: () => void;
    ref: React.MutableRefObject<any>;
}];
export {};
