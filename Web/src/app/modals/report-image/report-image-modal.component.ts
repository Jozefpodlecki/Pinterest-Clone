import { DOCUMENT } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { ReportReason } from "@models/ReportReason";
import ImageService from "@services/image-service";
import { BaseModalComponent } from "../base/base-modal.component";

@Component({
    selector: "report-image-modal",
    templateUrl: "./report-image-modal.component.html",
    styleUrls: ["./report-image-modal.component.scss"],
})
export class ReportImageModalComponent extends BaseModalComponent
    implements OnInit {
    faTimes = faTimes;

    reportForm: FormGroup;
    reason: FormControl;
    reasons: ReportReason[];
    defaultValue: ReportReason;
    error: boolean;
    state: string;

    constructor(
        @Inject(DOCUMENT) _document: Document,
        private _imageService: ImageService
    ) {
        super(_document);
        this.reasons = [];
        this.error = false;
        this.state = "loading";
        this.defaultValue = {
            id: -1,
            title: "Specify reason",
            description: "",
        };
        this.reason = new FormControl(null, [Validators.required]);

        this.reportForm = new FormGroup({
            reason: this.reason,
        });
    }

    ngOnInit(): void {
        this.state = "form";

        this._imageService.getReportReasons().subscribe(
            (reasons) => {
                this.reasons = reasons;
            },
            (error) => {
                this.error = true;
            }
        );
    }

    onSubmit() {
        const data = this.reportForm.value;
        this.state = "loading";

        this._imageService.reportImage(data).subscribe(
            (_) => {
                this.state = "sent";
                setTimeout(() => {
                    this.closeModal();
                }, 1000);
            },
            (error) => {
                this.state = "form";
                this.reason.setErrors({
                    server: true,
                });
                setTimeout(() => {
                    this.reason.setErrors(null);
                }, 2000);
            }
        );
    }
}
