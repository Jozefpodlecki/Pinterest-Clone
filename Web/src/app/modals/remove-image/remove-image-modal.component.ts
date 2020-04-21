import { Component, Inject } from '@angular/core';
import { BaseModalComponent } from '../base/base-modal.component';
import { DOCUMENT } from '@angular/common';
import { computeBackgroundStyle } from '@utils';

@Component({
  selector: 'remove-image-modal',
  templateUrl: './remove-image-modal.component.html',
  styleUrls: ['./remove-image-modal.component.scss']
})
export class RemoveImageModalComponent extends BaseModalComponent {

  imageId: number;
  backgroundStyle: any;

  constructor(
    @Inject(DOCUMENT) _document: Document
  ) {
    super(_document);
    this.backgroundStyle = {};
  }

  ngOnInit(): void {
  }

  click(value: boolean) {
    if(!value) {
      this.closeModal.emit();
    }
  }

  onChanges(modalData: any): void {
    
    this.imageId = modalData.imageId;

    this.backgroundStyle = {
      background: computeBackgroundStyle(modalData.background)
    }
  }

}
