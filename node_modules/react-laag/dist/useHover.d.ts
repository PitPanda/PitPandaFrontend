export interface Config {
    delayEnter?: number;
    delayLeave?: number;
    hideOnScroll?: boolean;
}
interface CallbackConfig extends Config {
    onShow: () => void;
    onHide?: () => void;
}
declare type HoverProps = {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onTouchStart: () => void;
    onTouchMove: () => void;
    onTouchEnd: () => void;
};
declare function useHover(config?: Config): readonly [boolean, HoverProps];
declare function useHover(config?: CallbackConfig): HoverProps;
export default useHover;
