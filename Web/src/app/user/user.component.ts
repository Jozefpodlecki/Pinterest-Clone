import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import ImageService from 'src/app/image-service';
import UserService from 'src/app/user-service';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  isZoomModalActive: boolean;
  isAddModalActive: boolean;
  isReportModalActive: boolean;
  isShareModalActive: boolean;
  isRemoveModalActive: boolean;

  userId: number;
  avatar: string;
  collection: Array<any>;

  constructor(
    private _route: ActivatedRoute,
    private _imageService: ImageService,
    private _userService: UserService
  ) {
    this.collection = [];
    this.avatar = '';
    this._route.paramMap.subscribe(params => {
      this.userId = Number(params.get('id'));
    })
  }

  ngOnInit(): void {
    this._imageService.getUserCollection(this.userId)
      .subscribe(collection => {
        this.collection = collection;
      })

    this._userService.getProfile()
      .subscribe(({avatar}) => {
        this.avatar = avatar;
      })
  }

  computeStyle(image: string) {
    return {
      background: `url(${image}) center center / cover no-repeat`
    }
  }
}
