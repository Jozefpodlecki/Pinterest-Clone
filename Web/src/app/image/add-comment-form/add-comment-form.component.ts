import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'add-comment-form',
  templateUrl: './add-comment-form.component.html',
  styleUrls: ['./add-comment-form.component.scss']
})
export class AddCommentFormComponent implements OnInit {
  faPaperPlane = faPaperPlane;

  commentForm: FormGroup;
  text: FormControl;

  constructor() {
    this.text = new FormControl('', [Validators.required]);

    this.commentForm = new FormGroup({
      text: this.text,
    });
  }

  ngOnInit(): void {
  }
  
  onSubmit(): void {
    
  }
}
