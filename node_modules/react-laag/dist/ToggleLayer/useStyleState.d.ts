import * as React from "react";
import { AnchorEnum, ResultingStyles } from "./types";
export default function useStyleState(anchor: AnchorEnum): {
    styles: ResultingStyles;
    lastStyles: React.MutableRefObject<ResultingStyles>;
    setStyles: React.Dispatch<React.SetStateAction<ResultingStyles>>;
    resetLastStyles: () => void;
};
