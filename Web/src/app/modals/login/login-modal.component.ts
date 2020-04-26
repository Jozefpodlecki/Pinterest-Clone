import { DOCUMENT } from "@angular/common";
import { Component, Inject, OnInit, SimpleChanges } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import UserService from "@services/user-service";
import { BaseModalComponent } from "../base/base-modal.component";

@Component({
    selector: "login-modal",
    templateUrl: "./login-modal.component.html",
    styleUrls: ["./login-modal.component.scss"],
})
export class LoginModalComponent extends BaseModalComponent {
    faGithub = faGithub;
    faTimes = faTimes;

    loginForm: FormGroup;
    usernameOrEmail: FormControl;
    password: FormControl;

    constructor(
        @Inject(DOCUMENT) _document: Document,
        private _userService: UserService
    ) {
        super(_document);
        this.usernameOrEmail = new FormControl("", [Validators.required]);
        this.password = new FormControl("", [Validators.required]);

        this.loginForm = new FormGroup({
            usernameOrEmail: this.usernameOrEmail,
            password: this.password,
        });
    }

    onSubmit() {
        const credentials = this.loginForm.value;

        this._userService.login(credentials).subscribe((_) => {
            this.closeModal();
        });
    }

    signInWithGithub() {}
}
