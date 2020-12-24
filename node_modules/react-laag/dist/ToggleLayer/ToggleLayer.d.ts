import * as React from "react";
import { LayerSide, RenderLayer, ToggleLayerOptions, DisappearType } from "./types";
declare type RenderChildrenProps = {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    toggle: () => void;
    triggerRef: React.RefObject<any>;
    layerSide: LayerSide | null;
};
export declare type Props = {
    children: (childrenProps: RenderChildrenProps) => React.ReactNode;
    renderLayer: RenderLayer;
    isOpen?: boolean;
    onOutsideClick?: () => void;
    onDisappear?: (type: DisappearType) => void;
} & ToggleLayerOptions;
declare function ToggleLayer({ children, renderLayer, placement, onStyle, isOpen: isOpenExternal, closeOnOutsideClick, onOutsideClick, onDisappear, closeOnDisappear, fixed, container, environment, ...props }: Props): JSX.Element;
export default ToggleLayer;
