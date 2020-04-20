import { Component, OnInit } from '@angular/core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import UserService from 'src/app/user-service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  faGithub = faGithub;

  loginForm: FormGroup;
  usernameOrEmail: FormControl;
  password: FormControl;
  loading: boolean;
  serverError: boolean;

  constructor(
    private _router: Router,
    private _userService: UserService) {
    this.loading = false;
    this.serverError = false;
    this.usernameOrEmail = new FormControl('', [Validators.required]);
    this.password = new FormControl('', [Validators.required]);

    this.loginForm = new FormGroup({
      usernameOrEmail: this.usernameOrEmail,
      password: this.password,
    });
  }

  ngOnInit(): void {
  }

  signInWithGithub() {
    
  }

  onSubmit() {
    this.loading = true;
    const credentials = this.loginForm.value;
    this._userService.login(credentials)
      .subscribe(_ => {
        this._router.navigate(['/'])
      }, error => {
        this.loading = false;
        this.serverError = true;
        console.log(error);

        setTimeout(() => {
          this.serverError = false;
        }, 2000)
      })

  }
}
