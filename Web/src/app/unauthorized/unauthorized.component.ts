import { Component, OnInit } from '@angular/core';
import { faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss']
})
export class UnauthorizedComponent implements OnInit {
  faShieldAlt = faShieldAlt;
  
  requestAccessForm: FormGroup;
  text: FormControl;
  constructor() {
    this.text = new FormControl('', [Validators.required, Validators.minLength(10)])

    this.requestAccessForm = new FormGroup({
      text: this.text
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.requestAccessForm.value);
  }

}
