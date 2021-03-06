import { DOCUMENT } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { computeBackgroundStyle } from "@utils";
import { BaseModalComponent } from "../base/base-modal.component";

@Component({
    selector: "zoom-image-modal",
    templateUrl: "./zoom-image-modal.component.html",
    styleUrls: ["./zoom-image-modal.component.scss"],
})
export class ZoomImageModalComponent extends BaseModalComponent {
    faTimes = faTimes;

    backgroundStyle: object;

    constructor(@Inject(DOCUMENT) _document: Document) {
        super(_document);
        this.backgroundStyle = {};
    }

    onChanges(modalData: any): void {
        const { background } = modalData;

        this.backgroundStyle = {
            background: computeBackgroundStyle(background),
        };
    }
}
