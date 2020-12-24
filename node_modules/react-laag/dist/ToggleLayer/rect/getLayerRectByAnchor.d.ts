import { AnchorEnum, LayerDimensions } from "../types";
declare type GetLayerRectArgs = {
    trigger: ClientRect;
    layer: ClientRect;
    anchor: AnchorEnum;
    triggerOffset: number;
    scrollOffset?: number;
    offsetSecondary?: number;
    layerDimensions: LayerDimensions | null;
};
export default function getLayerRectByAnchor({ trigger, layer, anchor, triggerOffset, scrollOffset, offsetSecondary, layerDimensions }: GetLayerRectArgs): ClientRect;
export {};
