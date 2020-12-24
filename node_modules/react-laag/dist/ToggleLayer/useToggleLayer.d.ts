import * as React from "react";
import { RenderLayer, ToggleLayerOptions, LayerSide } from "./types";
declare type OpenProps = {
    clientRect: ClientRect | (() => ClientRect);
    target: HTMLElement;
};
declare type UseToggleLayerPayload = {
    open: (props: OpenProps) => void;
    openFromContextMenuEvent: (event: React.MouseEvent<any, MouseEvent>) => void;
    openFromMouseEvent: (event: React.MouseEvent<any, MouseEvent>) => void;
    openFromSelection: (selection: Selection) => void;
    openFromRef: (ref: React.MutableRefObject<any>) => void;
    close: () => void;
    isOpen: boolean;
    layerSide: LayerSide | null;
};
export default function useToggleLayer(renderLayer: RenderLayer, { onStyle, closeOnOutsideClick, closeOnDisappear, fixed, container, placement, environment, ...props }?: ToggleLayerOptions): [React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>, UseToggleLayerPayload];
export {};
