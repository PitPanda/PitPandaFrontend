import * as React from "react";
/**
 * Tracks an element and keeps it in state
 * (together with other relevant state that depends on the element)
 */
declare function useElementRef<T = HTMLElement | null>(initialState?: T, elementToState?: (element: HTMLElement) => T): [any, T, React.MutableRefObject<HTMLElement | null>];
export default useElementRef;
