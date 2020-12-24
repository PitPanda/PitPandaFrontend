import * as React from "react";
declare type TransitionProps = {
    isOpen: boolean;
    children: (isOpen: boolean, onTransitionEnd: any, isLeaving: boolean) => React.ReactElement;
};
export default function Transition({ isOpen: isOpenExternal, children }: TransitionProps): React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | null;
export {};
