import { Container } from "./types";
import * as React from "react";
declare type UseElementState = {
    triggerElement: HTMLElement | null;
    relativeParentElement: HTMLElement | null;
    scrollParents: HTMLElement[];
};
export default function useElementState(container: Container | undefined, fixed: boolean | undefined, environment?: Window): [any, UseElementState, React.MutableRefObject<HTMLElement | null>];
export {};
