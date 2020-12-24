declare type EventListenable = {
    addEventListener: any;
    removeEventListener: any;
};
export default function useEvent<T extends EventListener>(element: EventListenable | EventListenable[] | null, event: string | string[], callback: T, enabled?: boolean, capture?: boolean): void;
export {};
