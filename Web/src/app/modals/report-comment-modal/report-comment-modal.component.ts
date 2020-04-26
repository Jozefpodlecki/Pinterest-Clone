import { DOCUMENT } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import ImageService from "@services/image-service";
import { BaseModalComponent } from "../base/base-modal.component";

@Component({
    selector: "report-comment-modal",
    templateUrl: "./report-comment-modal.component.html",
    styleUrls: ["./report-comment-modal.component.scss"],
})
export class ReportCommentModalComponent extends BaseModalComponent
    implements OnInit {
    constructor(
        @Inject(DOCUMENT) _document: Document,
        private _imageService: ImageService
    ) {
        super(_document);
    }

    ngOnInit(): void {}
}
