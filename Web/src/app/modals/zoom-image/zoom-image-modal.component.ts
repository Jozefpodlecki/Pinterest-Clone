import { Component, Inject } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { DOCUMENT } from '@angular/common';
import { BaseModalComponent } from '../base/base-modal.component';
import { computeBackgroundStyle } from '@utils';

@Component({
  selector: 'zoom-image-modal',
  templateUrl: './zoom-image-modal.component.html',
  styleUrls: ['./zoom-image-modal.component.scss']
})
export class ZoomImageModalComponent extends BaseModalComponent {
  faTimes = faTimes;
  
  backgroundStyle: object;

  constructor(
    @Inject(DOCUMENT) _document: Document
  ) {
    super(_document);
    this.backgroundStyle = {};
  }

  ngOnInit(): void {
  }

  onChanges(modalData: any): void {
    
    const { background } = modalData;

    this.backgroundStyle = {
      background: computeBackgroundStyle(background)
    }
  }

}
