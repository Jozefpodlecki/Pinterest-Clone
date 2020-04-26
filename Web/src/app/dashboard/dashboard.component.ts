import {
    animate,
    keyframes,
    query,
    stagger,
    style,
    transition,
    trigger,
} from "@angular/animations";
import { DOCUMENT } from "@angular/common";
import { Component, HostListener, Inject, OnInit } from "@angular/core";
import { faSyncAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import { CardAction } from "@models/CardAction";
import { Image } from "@models/Image";
import { ImageSearchCriteria } from "@models/ImageSearchCriteria";
import { AuthContextService } from "@services/auth-context/auth-context.service";
import ImageService from "@services/image-service";
import UserService from "@services/user-service";
import { trackById } from "utils";

@Component({
    selector: "dashboard",
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.scss"],
    animations: [
        trigger("imagesAnimation", [
            transition("* => *", [
                query(
                    ":enter",
                    style({
                        opacity: 0,
                    }),
                    {
                        optional: true,
                    }
                ),
                query(
                    ":enter",
                    stagger(".1s", [
                        animate(
                            ".1s",
                            style({
                                opacity: 1,
                            })
                        ),
                    ]),
                    {
                        optional: true,
                    }
                ),
                query(
                    ":leave",
                    stagger(".1s", [
                        animate(
                            ".1s",
                            keyframes([
                                style({
                                    opacity: 1,
                                    offset: 0,
                                }),
                                style({
                                    opacity: 0,
                                    offset: 1,
                                }),
                            ])
                        ),
                    ]),
                    {
                        optional: true,
                    }
                ),
            ]),
        ]),
    ],
})
export class DashboardComponent implements OnInit {
    trackById = trackById;
    faTimes = faTimes;
    faSyncAlt = faSyncAlt;

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
    defaultCriteria: ImageSearchCriteria;
    serverError: boolean;
    state: string;

    constructor(
        private _userService: UserService,
        private _imageService: ImageService,
        @Inject(DOCUMENT) private _document: Document,
        private _authContextService: AuthContextService
    ) {
        this.images = [];
        this.isReportModalActive = false;
        this.isShareModalActive = false;
        this.isLoginModalActive = false;
        this.isZoomInModalActive = false;
        this.isAddModalActive = false;
        this.isSearchActive = false;
        this.canClearText = false;
        this.search = "";
        this.defaultPlaceholder = "Search...";
        this.searchPlaceholder = this.defaultPlaceholder;
        this.defaultCriteria = {
            value: "",
            page: 0,
            pageSize: 10,
        };
        this.state = "loading";
    }

    ngOnInit(): void {
        const criteria = {
            ...this.defaultCriteria,
        };

        this._imageService.getImages(criteria).subscribe(
            (images) => {
                this.images = images;
                this.state = "data";
            },
            (error) => {
                this.state = "error";
            }
        );
    }

    @HostListener("window:scroll", [])
    onScroll(): void {
        const window = this._document.defaultView;
        const clientHeight = window.innerHeight;
        const scrollY = window.scrollY;
        const totalHeight = this._document.body.offsetHeight;
        const currentHeight = clientHeight + scrollY;

        if (currentHeight >= totalHeight) {
        }
    }

    onFocus() {
        this.searchPlaceholder = "";
        this.isSearchActive = true;
    }

    onBlur() {
        this.searchPlaceholder = this.defaultPlaceholder;
        this.isSearchActive = false;
    }

    goToImage(image: Image) {}

    onSearch(value: string) {
        const criteria = {
            ...this.defaultCriteria,
            value,
        };

        this._imageService.getImages(criteria).subscribe((images) => {
            this.images = images;
        });

        if (value) {
            this.canClearText = true;
            return;
        }

        this.canClearText = false;
    }

    refresh() {
        const criteria = {
            ...this.defaultCriteria,
        };
        this.state = "loading";

        this._imageService.getImages(criteria).subscribe(
            (images) => {
                this.images = images;
                this.state = "data";
            },
            (error) => {
                this.state = "error";
            }
        );
    }

    clearText() {
        this.search = "";
        this.canClearText = false;
    }

    action(action: CardAction, image: Image) {
        if (
            action !== CardAction.ZoomIn &&
            !this._authContextService.isLoggedIn.value
        ) {
            this.isLoginModalActive = true;
            return;
        }

        switch (action) {
            case CardAction.Add:
                this.isAddModalActive = true;
                break;
            case CardAction.ZoomIn:
                this.modalData = {
                    background: image.link,
                };
                this.isZoomInModalActive = true;
                break;
            case CardAction.Report:
                this.isReportModalActive = true;
                break;
            case CardAction.Share:
                this.isShareModalActive = true;
                break;
        }
    }
}
