import { Component, forwardRef, Input, OnInit } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { trackById } from "@utils";

@Component({
    selector: "badge-control",
    templateUrl: "./badge-control.component.html",
    styleUrls: ["./badge-control.component.scss"],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => BadgeControlComponent),
            multi: true,
        },
    ],
})
export class BadgeControlComponent implements ControlValueAccessor {
    trackById = trackById;
    @Input("values") options: any[];
    selected: any;

    constructor() {
        this.selected = null;
        this.options = [];
    }

    onChange(value: any) {}

    writeValue(value: any): void {
        this.selected = value;
    }

    registerOnChange(callback: (value: any) => void): void {
        this.onChange = callback;
    }

    registerOnTouched(callback: (value: any) => void): void {
        this.onChange = callback;
    }

    setDisabledState?(isDisabled: boolean): void {}
}
