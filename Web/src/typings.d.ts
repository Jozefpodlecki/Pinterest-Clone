interface _MouseEvent<T> extends MouseEvent {
    target: EventTarget & T;
}