import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: "report-comment-form",
    templateUrl: "./report-comment-form.component.html",
    styleUrls: ["./report-comment-form.component.scss"],
})
export class ReportCommentFormComponent implements OnInit {
    reasons: any[];
    reportCommentForm: FormGroup;
    reason: FormControl;

    constructor() {
        this.reasons = [
            {
                id: 1,
                name: "This account might be compromised or hacked",
            },
            {
                id: 2,
                name: "Hate speech",
            },
            {
                id: 3,
                name: "Spam or scam",
            },
            {
                id: 4,
                name: "Violence or harmful behavior",
            },
            {
                id: 5,
                name: "Sexually explicit content",
            },
            {
                id: 6,
                name: "Terrorism",
            },
        ];
        this.reason = new FormControl(null, [Validators.required]);

        this.reportCommentForm = new FormGroup({
            reason: this.reason,
        });
    }

    ngOnInit(): void {}

    onSubmit() {}
}
