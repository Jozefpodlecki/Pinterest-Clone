import { DOCUMENT } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import {
    faFacebook,
    faLinkedin,
    faQuora,
    faTwitter,
    IconDefinition,
} from "@fortawesome/free-brands-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { trackByName } from "@utils";
import { BaseModalComponent } from "../base/base-modal.component";

interface Action {
    name: string;
    icon: IconDefinition;
}

@Component({
    selector: "share-image-modal",
    templateUrl: "./share-image-modal.component.html",
    styleUrls: ["./share-image-modal.component.scss"],
})
export class ShareImageModalComponent extends BaseModalComponent
    implements OnInit {
    faTimes = faTimes;
    trackByName = trackByName;

    actions: Action[];

    constructor(@Inject(DOCUMENT) _document: Document) {
        super(_document);
        this.actions = [
            {
                name: "facebook",
                icon: faFacebook,
            },
            {
                name: "quora",
                icon: faQuora,
            },
            {
                name: "twitter",
                icon: faTwitter,
            },
            {
                name: "linkedin",
                icon: faLinkedin,
            },
        ];
    }

    ngOnInit(): void {}

    shareVia() {}
}
