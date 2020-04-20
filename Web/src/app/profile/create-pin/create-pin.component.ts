import { Component, OnInit, HostListener, HostBinding, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'create-pin',
  templateUrl: './create-pin.component.html',
  styleUrls: ['./create-pin.component.scss']
})
export class CreatePinComponent implements OnInit {

  createPinForm: FormGroup;
  title: FormControl;
  description: FormControl;
  image: FormControl;

  constructor() {
    this.title = new FormControl('', [Validators.required]);
    this.description = new FormControl('', [Validators.required]);
    this.image = new FormControl(null, [Validators.required]);

    this.createPinForm = new FormGroup({
      title: this.title,
      description: this.description,
      image: this.image,
    });
  }


  ngOnInit(): void {
  }

  fileSelected() {
    
  }

  onSubmit() {

  }

}
