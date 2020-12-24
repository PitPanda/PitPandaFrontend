import { AnchorEnum, Direction, Primary, Side, LayerSide, Rects } from "./types";
export declare const Anchor: Record<Exclude<AnchorEnum, "CENTER">, AnchorEnum>;
export declare const POSSIBLE_ANCHORS: AnchorEnum[];
export declare const PRIMARY_OPPOSITES: Record<Primary, Primary>;
export declare function getPrimaryDirection(anchor: AnchorEnum): Direction;
export declare function getSecondaryAnchorOptionsByPrimary(primary: Primary, anchorOptions: AnchorEnum[]): AnchorEnum[];
declare type SplitAnchor = {
    primary: Primary;
    secondary: Side;
};
export declare function splitAnchor(anchor: AnchorEnum): SplitAnchor;
export declare function getLayerSideByAnchor(anchor: AnchorEnum): LayerSide;
export declare function getAnchorPriority(preferedAnchor: AnchorEnum, possibleAnchors: AnchorEnum[], preferedX: "LEFT" | "RIGHT", preferedY: "TOP" | "BOTTOM", rects: Rects): AnchorEnum[];
export {};
