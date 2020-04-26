import {
    animate,
    state,
    style,
    transition,
    trigger,
} from "@angular/animations";
import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: "text-animator",
    templateUrl: "./text-animator.component.html",
    styleUrls: ["./text-animator.component.scss"],
    animations: [
        trigger("toggle", [
            transition(":enter", [
                style({ opacity: 0 }),
                animate(".2s", style({ opacity: 1 })),
            ]),
            transition(":leave", [
                animate(
                    ".2s",
                    style({ opacity: 0, transform: "translateY(30px)" })
                ),
            ]),
        ]),
    ],
})
export class TextAnimatorComponent implements OnInit {
    @Input()
    set value(value) {
        this.values.pop();
        this.values.push(value);
    }

    values: any[];

    constructor() {
        this.values = [];
    }

    ngOnInit(): void {}
}
