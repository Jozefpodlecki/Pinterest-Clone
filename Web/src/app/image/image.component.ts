import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { faPaperPlane, faArrowLeft, faTrash, faFlag } from '@fortawesome/free-solid-svg-icons';
import ImageService from '@services/image-service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit, AfterViewInit {
  faArrowLeft = faArrowLeft;

  link: string;
  comments: Comment[];
  backgroundStyle: object;
  title: string;
  description: string;
  width: number;
  height: number;
  imageId: number;

  @ViewChild('imageWrapper') imageWrapper: ElementRef<HTMLDivElement>;

  constructor(
    private _route: ActivatedRoute,
    private _imageService: ImageService) {
    this.backgroundStyle = {};
    this.title = '';
    this.description = '';
    this.comments = [];
    this._route.paramMap.subscribe(params => {
      this.imageId = Number(params.get('id'));
    })
  }

  ngAfterViewInit(): void {
    
    const { width, height } = this.imageWrapper.nativeElement.getBoundingClientRect();
    this.width = width;
    this.height = height;
    this.backgroundStyle = {
      ...this.backgroundStyle,
      width: `${this.width}px`,
      height: `${this.height}px`
    }

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

      this._imageService.getComments({
          imageId: this.imageId,
          page: 0,
          pageSize: 5
      })
      .subscribe(comments => {
        this.comments = comments;
      })
  }

  onSubmit() {
    
  }

}
