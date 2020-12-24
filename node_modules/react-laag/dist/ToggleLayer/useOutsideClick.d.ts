import React from "react";
export declare const OutsideClickContext: React.Context<(layer: React.RefObject<HTMLElement | null | undefined>) => void>;
declare type OutsideClickGroupProviderProps = {
    refs: React.MutableRefObject<Set<React.RefObject<HTMLElement | null | undefined>>>;
    children: any;
};
export declare function OutsideClickGroupProvider({ refs, children }: OutsideClickGroupProviderProps): any;
declare function useOutsideClick(refs: React.MutableRefObject<Set<React.RefObject<HTMLElement | null | undefined>>>, callback: () => void): void;
export default useOutsideClick;
