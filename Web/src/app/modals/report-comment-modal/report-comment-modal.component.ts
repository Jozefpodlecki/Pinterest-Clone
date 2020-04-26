import { Component, OnInit, Inject } from '@angular/core';
import { BaseModalComponent } from '../base/base-modal.component';
import { DOCUMENT } from '@angular/common';
import ImageService from '@services/image-service';

@Component({
  selector: 'report-comment-modal',
  templateUrl: './report-comment-modal.component.html',
  styleUrls: ['./report-comment-modal.component.scss']
})
export class ReportCommentModalComponent extends BaseModalComponent {

  constructor(
    @Inject(DOCUMENT) _document: Document,
    private _imageService: ImageService
  ) {
    super(_document);
  }

  ngOnInit(): void {
  }

}
