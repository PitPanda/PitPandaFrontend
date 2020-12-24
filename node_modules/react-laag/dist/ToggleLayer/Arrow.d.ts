import * as React from "react";
import { LayerSide } from "./types";
declare type ArrowProps = {
    angle?: number;
    size?: number;
    roundness?: number;
    borderWidth?: number;
    borderColor?: string;
    backgroundColor?: string;
    layerSide?: LayerSide;
    style?: React.CSSProperties;
};
export default function Arrow({ size, angle, borderWidth, borderColor, roundness, backgroundColor, layerSide, style }: ArrowProps): JSX.Element | null;
export {};
