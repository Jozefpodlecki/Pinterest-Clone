import { DOCUMENT } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { computeBackgroundStyle } from "@utils";
import { BaseModalComponent } from "../base/base-modal.component";

@Component({
    selector: "remove-image-modal",
    templateUrl: "./remove-image-modal.component.html",
    styleUrls: ["./remove-image-modal.component.scss"],
})
export class RemoveImageModalComponent extends BaseModalComponent {
    imageId: number;
    backgroundStyle: any;

    constructor(@Inject(DOCUMENT) _document: Document) {
        super(_document);
        this.backgroundStyle = {};
    }

    onChanges(modalData: any): void {
        this.imageId = modalData.imageId;

        this.backgroundStyle = {
            background: computeBackgroundStyle(modalData.background),
        };
    }

    confirmDelete() {}
}
