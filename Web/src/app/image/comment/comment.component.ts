import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { faTrash, faFlag } from '@fortawesome/free-solid-svg-icons';
import { computeBackgroundStyle } from '@utils';

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  faTrash = faTrash;
  faFlag = faFlag;

  @Input() canDelete: boolean;
  @Input() comment: any;
  @Output() action: EventEmitter<string>;

  constructor() {
    this.comment = {};
    this.canDelete = false;
    this.action = new EventEmitter();
  }

  ngOnInit(): void {
  }

  commentAvatar(comment: any) {
    const avatar = comment.avatar;

    return {
      background: computeBackgroundStyle(avatar)
    }
  }

}
