import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import ImageService from "@services/image-service";
import UserService from "@services/user-service";
import { sendFile } from "@utils";

interface CreatePinData {
    title: string;
    description: string;
    image: File;
}

@Component({
    selector: "create-pin",
    templateUrl: "./create-pin.component.html",
    styleUrls: ["./create-pin.component.scss"],
})
export class CreatePinComponent implements OnInit {
    createPinForm: FormGroup;
    title: FormControl;
    description: FormControl;
    category: FormControl;
    image: FormControl;
    progressValue: number;
    loading: boolean;

    constructor(
        private _userService: UserService,
        private _imageService: ImageService,
        private _router: Router
    ) {
        this.title = new FormControl("", [Validators.required]);
        this.description = new FormControl("", [Validators.required]);
        this.category = new FormControl("", [Validators.required]);
        this.image = new FormControl(null, [Validators.required]);
        this.progressValue = 0;
        this.loading = false;

        this.createPinForm = new FormGroup({
            title: this.title,
            description: this.description,
            category: this.category,
            image: this.image,
        });
    }

    ngOnInit(): void {}

    async onSubmit() {
        this.loading = true;
        const formData = this.createPinForm.value as CreatePinData;
        const image = formData.image;
        await sendFile(this._imageService, image, formData);

        this._userService.getProfile().subscribe((profile) => {
            this._router.navigate([`/user/${profile.id}`]);
        });
    }
}
