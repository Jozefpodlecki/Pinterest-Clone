import { Component, Output, EventEmitter, Inject } from '@angular/core';
import ImageService from '@services/image-service';
import { Category } from '@models/Category';
import { trigger, transition, style, query, stagger, animate, keyframes } from '@angular/animations';
import { trackById } from '@utils';
import { BaseModalComponent } from '../base/base-modal.component';
import { DOCUMENT } from '@angular/common';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'add-image-modal',
  templateUrl: './add-image-modal.component.html',
  styleUrls: ['./add-image-modal.component.scss'],
  animations: [
    trigger('categoriesAnimation', [
      transition('* => *', [
        query(':enter', style({
          opacity: 0
        }), {
          optional: true 
        }),
        query(':enter',
          stagger('.2s', [
            animate('.2s', style({
              opacity: 1
            }))
          ]), {
            optional: true 
        }),
        query(':leave',
          stagger('.2s', [
            animate('.2s', keyframes([
              style({
                opacity: 1,
                offset: 0,
              }),
              style({
                opacity: 0,
                offset: 1,
              })
            ]))
          ]), {
            optional: true 
        })
      ])
    ])
  ]
})
export class AddImageModalComponent extends BaseModalComponent {
  trackById = trackById;
  faTimes = faTimes;
  
  categories: Category[];
  categoryId: number;
  imageId: number;
  value: string;
  @Output() onSave: EventEmitter<any>;

  constructor(
    private _imageService: ImageService,
    @Inject(DOCUMENT) _document: Document
    ) {
    super(_document);
    this.categories = [];
    this.onSave = new EventEmitter();
    this.categoryId = -1;
    this.imageId = -1;
    this.value = '';

  }

  getCategories(value: string = '') {
    this._imageService.getCategories({
      page: 0,
      pageSize: 5,
      value
  })
  .subscribe(categories => {
    this.categories = categories;
  })
  }

  ngOnInit(): void {
    this.getCategories();
  }

  onCategorySelect(categoryId: number) {
    this.categoryId = categoryId;
  }

  categorySearch(value: string) {
    this.getCategories(value);
  }

  saveImage() {
    const data = {
      categoryId: this.categoryId,
      imageId: this.imageId
    }
    this._imageService.addImageToCollection(data)
      .subscribe(() => {

      })
  }

  isInvalid() {
    return this.categoryId === -1;
  }

  onChanges(modalData: any): void {
    
    this.imageId = modalData.imageId;
  }
}
