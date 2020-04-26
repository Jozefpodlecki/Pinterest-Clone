import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { faPaperPlane, faArrowLeft, faTrash, faFlag } from '@fortawesome/free-solid-svg-icons';
import ImageService from '@services/image-service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ImageComment } from '@models/ImageComment';
import { trackById } from '@utils';
import { CommentSearchCriteria } from '@models/CommentSearchCriteria';

@Component({
  selector: 'image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit, AfterViewInit {
  trackById = trackById;
  faArrowLeft = faArrowLeft;

  link: string;
  comments: ImageComment[];
  backgroundStyle: object;
  defaultCriteria: CommentSearchCriteria;
  criteria: CommentSearchCriteria;
  title: string;
  description: string;
  width: number;
  height: number;
  imageId: number;
  pageSize: number;
  isDeleteCommentModalActive: boolean;
  isReportCommentModalActive: boolean;
  modalData: any;
  isImageLoading: boolean;
  commentsState: string;

  @ViewChild('imageWrapper') imageWrapper: ElementRef<HTMLDivElement>;

  constructor(
    private _route: ActivatedRoute,
    private _imageService: ImageService) {
    this.backgroundStyle = {};
    this.title = '';
    this.description = '';
    this.comments = [];
    this.pageSize = 5;
    this.defaultCriteria = {
      imageId: this.imageId,
      page: 0,
      pageSize: this.pageSize
    }
    this.criteria = {
      ...this.defaultCriteria
    }
    this.isDeleteCommentModalActive = false;
    this.isReportCommentModalActive = false;
    this.modalData = null;
    this.isImageLoading = true;
    this.commentsState = 'loading';
    this._route.paramMap.subscribe(params => {
      this.imageId = Number(params.get('id'));
      this.defaultCriteria.imageId = this.imageId;
      this.criteria = {
        ...this.defaultCriteria
      }
    })
  }

  loadComments() {
    this.commentsState = 'loading';
    this.criteria = {
      ...this.criteria,
      pageSize: this.criteria.pageSize + this.pageSize
    }

    this._imageService.getComments(this.criteria)
    .subscribe(comments => {
      this.commentsState = 'complete';
      this.comments = comments;
    })
  }

  ngAfterViewInit(): void {
    
    setTimeout(() => {
      const { width, height } = this.imageWrapper.nativeElement.getBoundingClientRect();
      this.width = width;
      this.height = height;
      this.backgroundStyle = {
        ...this.backgroundStyle,
        width: `${this.width}px`,
        height: `${this.height}px`
      }
      this.isImageLoading = false;
    }, 1500)
  }

  ngOnInit(): void {
    this._imageService.getImage(this.imageId)
      .subscribe(({title, description, link}) => {
        this.title = title;
        this.description = description;

        setTimeout(() => {
          this.backgroundStyle = {
            ...this.backgroundStyle,
            backgroundImage: `url(${link})`,
          }
        }, 0)
      })

      this._imageService.getComments(this.criteria)
        .subscribe(comments => {
          this.comments = comments;
          this.commentsState = 'hasMoreComments';
        })
  }

  commentAction(action: string, comment: ImageComment) {
    switch(action) {
      case "delete":
        this.modalData = {
          id: comment.id,
        }
        this.isDeleteCommentModalActive = true;
        break;
      case "report":
        this.modalData = {
          id: comment.id,
        }
        this.isReportCommentModalActive = true;
        break;
    }
  }

  reportComment() {

  }

  removeComment() {
    
  }

  sendComment(data: any) {
    data = {
      ...data,
      imageId: this.imageId
    }

    this._imageService
      .addComment(data)
      .subscribe(_ => {
        this._imageService.getComments(this.criteria)
          .subscribe(comments => {
            this.commentsState = 'hasMoreComments';
            this.comments = comments;
          })
      })
  }

}
