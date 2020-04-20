import { Component, OnInit, Input } from '@angular/core';
import { faTrash, faFlag } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  faTrash = faTrash;
  faFlag = faFlag;

  @Input() comment: any;

  constructor() {
    this.comment = {};
  }

  ngOnInit(): void {
  }

  commentAvatar(comment: any) {
    const avatar = comment.avatar;

    return {
      background: `url(${avatar}) center center / cover`
    }
  }

}
