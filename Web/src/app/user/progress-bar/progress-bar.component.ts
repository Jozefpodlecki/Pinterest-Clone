import { Component, HostBinding, Input, OnInit } from "@angular/core";

@Component({
    selector: "progress-bar",
    templateUrl: "./progress-bar.component.html",
    styleUrls: ["./progress-bar.component.scss"],
})
export class ProgressBarComponent implements OnInit {
    @Input() width: any;
    @Input() height: number;
    @Input() value: number;

    get progressBarValue() {
        return `${this.value * 100}%`;
    }

    @HostBinding("style.width")
    get getWidth() {
        if (this.width === "auto") {
            return "auto";
        }

        return `${this.width}px`;
    }

    @HostBinding("style.height")
    get getHeight() {
        return `${this.height}px`;
    }

    constructor() {
        this.width = 100;
        this.height = 20;
        this.value = 0;
    }

    ngOnInit(): void {}
}
