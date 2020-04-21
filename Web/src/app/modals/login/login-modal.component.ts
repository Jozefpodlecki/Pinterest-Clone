import { Component, SimpleChanges, Inject } from '@angular/core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import UserService from '@services/user-service';
import { BaseModalComponent } from '../base/base-modal.component';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent extends BaseModalComponent {
  faGithub = faGithub;
  faTimes = faTimes;
  
  loginForm: FormGroup;
  usernameOrEmail: FormControl;
  password: FormControl;

  constructor(
    @Inject(DOCUMENT) _document: Document
    ) {
    super(_document);
    this.usernameOrEmail = new FormControl('', [Validators.required]);
    this.password = new FormControl('', [Validators.required]);

    this.loginForm = new FormGroup({
      usernameOrEmail: this.usernameOrEmail,
      password: this.password,
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    
  }

  ngOnInit(): void {
  }

  onSubmit() {

  }

  signInWithGithub() {
    
  }
}
