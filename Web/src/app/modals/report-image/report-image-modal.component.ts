import { Component, Inject } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { BaseModalComponent } from '../base/base-modal.component';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'report-image-modal',
  templateUrl: './report-image-modal.component.html',
  styleUrls: ['./report-image-modal.component.scss']
})
export class ReportImageModalComponent extends BaseModalComponent {

  reportForm: FormGroup;
  reason: FormControl;
  
  constructor(
    @Inject(DOCUMENT) _document: Document
  ) {
    super(_document);
    this.reason = new FormControl('', [Validators.required]);

    this.reportForm = new FormGroup({
      reason: this.reason
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {

  }

}
