export {};

declare global {
    namespace events {
        interface _MouseEvent<T> extends MouseEvent {
            target: EventTarget & T;
        }
    }
}