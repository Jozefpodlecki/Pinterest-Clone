import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import ImageService from 'src/app/image-service';
import { Image } from '../models/Image';
import UserService from '../user-service';
import { trigger, transition, query, style, stagger, animate, keyframes } from '@angular/animations';
import { trackById } from 'src/utils';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('imagesAnimation', [
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
export class DashboardComponent implements OnInit {
  trackById = trackById;
  faTimes = faTimes;

  search: string;
  defaultPlaceholder: string;
  searchPlaceholder: string;
  isAddModalActive: boolean;
  isLoginModalActive: boolean;
  isZoomInModalActive: boolean;
  isSearchActive: boolean;
  canClearText: boolean;
  isReportModalActive: boolean;
  isShareModalActive: boolean;
  modalData: object;
  images: Image[];
  defaultCriteria: { value: string; page: number; pageSize: number; };

  constructor(
    private _userService: UserService,
    private _imageService: ImageService,
    @Inject(DOCUMENT) private _document: Document
    ) {
    this.images = [];
    this.isReportModalActive = false;
    this.isShareModalActive = false;
    this.isLoginModalActive = false;
    this.isZoomInModalActive = false;
    this.isAddModalActive = false;
    this.isSearchActive = false;
    this.canClearText = false;
    this.search = ''
    this.defaultPlaceholder = 'Search...';
    this.searchPlaceholder = this.defaultPlaceholder;
    this.defaultCriteria = {
      value: '',
      page: 0,
      pageSize: 10
    };
  }

  ngOnInit(): void {
    const criteria = {
      ...this.defaultCriteria
    };

    this._imageService.getImages(criteria)
      .subscribe(images => {
        this.images = images;
      })
  }

  @HostListener("window:scroll", [])
  onScroll(): void {
    const window = this._document.defaultView;
    const clientHeight = window.innerHeight;
    const scrollY = window.scrollY;
    const totalHeight = this._document.body.offsetHeight;
    const currentHeight = clientHeight + scrollY;
    console.log(clientHeight, scrollY, totalHeight);
  if (currentHeight >= totalHeight) {
      console.log('end of page');
    }
  }

  onFocus() {
    this.searchPlaceholder = '';
    this.isSearchActive = true;
  }

  onBlur() {
    this.searchPlaceholder = this.defaultPlaceholder;
    this.isSearchActive = false;
  }

  onSearch(value: string) {
    const criteria = {
      ...this.defaultCriteria,
      value
    };

    this._imageService.getImages(criteria).subscribe(images => {
      this.images = images;
    })

    if(value) {
      this.canClearText = true;
      return;
    }

    this.canClearText = false;
  }

  clearText() {
    this.search = '';
    this.canClearText = false;
  }

  zoomIn(data) {
    this.isZoomInModalActive = true;
    this.modalData = {
      background: data
    }
  }

  addImage() {

    if(this._userService.isLoggedIn.value) {
      //this.isAddModalActive = true;
      //return;
    }
    this.isAddModalActive = true;
    //this.isLoginModalActive = true;
    
  }

  shareImage() {
    this.isShareModalActive = true;
  }

  reportImage() {
    this.isReportModalActive = true;
  }
}
