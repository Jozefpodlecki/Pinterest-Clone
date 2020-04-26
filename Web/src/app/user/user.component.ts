import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CardAction } from "@models/CardAction";
import { Image } from "@models/Image";
import ImageService from "@services/image-service";
import UserService from "@services/user-service";
import { computeBackgroundStyle } from "@utils";

@Component({
    selector: "user",
    templateUrl: "./user.component.html",
    styleUrls: ["./user.component.scss"],
})
export class UserComponent implements OnInit {
    isZoomModalActive: boolean;
    isAddModalActive: boolean;
    isReportModalActive: boolean;
    isShareModalActive: boolean;
    isRemoveModalActive: boolean;

    userId: number;
    avatar: string;
    modalData: object;
    collection: any[];
    canDelete: boolean;
    canAdd: boolean;

    constructor(
        private _route: ActivatedRoute,
        private _imageService: ImageService,
        private _userService: UserService
    ) {
        this.collection = [];
        this.avatar = "";
        this._route.paramMap.subscribe((params) => {
            this.userId = Number(params.get("id"));
        });
        this.canDelete = false;
        this.isAllowedToDelete();
    }

    isAllowedToDelete() {
        this._userService.getProfile().subscribe((profile) => {
            if (this.userId === profile.id || profile.isAdmin) {
                this.canDelete = true;
                this.canAdd = false;
            }
        });
    }

    action(action: CardAction, image: Image) {
        switch (action) {
            case CardAction.Add:
                this.isAddModalActive = true;
                this.modalData = {
                    background: image.link,
                };
                break;
            case CardAction.ZoomIn:
                this.isZoomModalActive = true;
                break;
            case CardAction.Remove:
                this.isRemoveModalActive = true;
                break;
            case CardAction.Report:
                this.isReportModalActive = true;
                break;
            case CardAction.Share:
                this.isShareModalActive = true;
                break;
        }
    }

    ngOnInit(): void {
        this._imageService
            .getUserCollection(this.userId)
            .subscribe((collection) => {
                this.collection = collection;
            });

        this._userService.getProfile().subscribe(({ avatar }) => {
            this.avatar = avatar;
        });
    }

    computeStyle(image: string) {
        return {
            background: computeBackgroundStyle(image),
        };
    }
}
