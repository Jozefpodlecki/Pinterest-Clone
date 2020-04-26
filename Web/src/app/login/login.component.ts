import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import UserService from "@services/user-service";

@Component({
    selector: "login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
    faGithub = faGithub;

    loginForm: FormGroup;
    usernameOrEmail: FormControl;
    password: FormControl;
    serverError: boolean;
    state: string;

    constructor(private _router: Router, private _userService: UserService) {
        this.serverError = false;
        this.usernameOrEmail = new FormControl("", [Validators.required]);
        this.password = new FormControl("", [Validators.required]);

        this.loginForm = new FormGroup({
            usernameOrEmail: this.usernameOrEmail,
            password: this.password,
        });
        this.state = "loading";
    }

    ngOnInit(): void {
        this.state = "login";
    }

    signInWithGithub() {}

    onSubmit() {
        this.state = "loading";
        const credentials = this.loginForm.value;

        this._userService.login(credentials).subscribe(
            (_) => {
                this._router.navigate(["/"]);
            },
            (error) => {
                this.state = "login";
                this.serverError = true;

                setTimeout(() => {
                    this.serverError = false;
                }, 2000);
            }
        );
    }
}
