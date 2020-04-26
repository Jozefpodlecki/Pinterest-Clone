import {
    AfterViewInit,
    Component,
    ElementRef,
    forwardRef,
    HostBinding,
    HostListener,
    OnInit,
    Output,
    ViewChild,
} from "@angular/core";
import { EventEmitter } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { DomSanitizer, SafeStyle } from "@angular/platform-browser";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { computeBackgroundStyle } from "@utils";

type fileCallback = (value: File) => void;

@Component({
    selector: "image-upload",
    templateUrl: "./image-upload.component.html",
    styleUrls: ["./image-upload.component.scss"],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ImageUploadComponent),
            multi: true,
        },
    ],
})
export class ImageUploadComponent
    implements ControlValueAccessor, AfterViewInit {
    faUpload = faUpload;

    @ViewChild("file") file: ElementRef<HTMLInputElement>;

    previewStyle: any;
    value: File;

    @HostListener("dragover", ["$event"])
    public onDragOver(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
    }

    @HostListener("dragleave", ["$event"])
    public onDragLeave(event: Event) {
        event.preventDefault();
        event.stopPropagation();
    }

    @HostListener("drop", ["$event"])
    public onDrop(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();

        const { files: [file] = [] as any } = event.dataTransfer;

        if (!file || file.type !== "image/jpeg") {
            return;
        }

        this.fileUpload(file);
    }

    constructor(
        private _elementRef: ElementRef<HTMLDivElement>,
        private _sanitizer: DomSanitizer,
        private _fileReader: FileReader
    ) {
        this.previewStyle = {};
        this.value = null;
    }

    ngAfterViewInit(): void {
        const {
            width,
            height,
        } = this._elementRef.nativeElement.getBoundingClientRect();
        this.previewStyle = {
            width: `${width}px`,
            height: `${height}px`,
        };
    }

    onChange(value: File) {}

    onTouch(value: File) {}

    writeValue(value: File): void {
        this.value = value;
    }

    registerOnChange(callback: fileCallback): void {
        this.onChange = callback;
    }

    registerOnTouched(callback: fileCallback): void {
        this.onTouch = callback;
    }

    setDisabledState?(isDisabled: boolean): void {}

    fileLoaded = () => {
        const dataUrl = this._fileReader.result;
        this.previewStyle = {
            ...this.previewStyle,
            background: computeBackgroundStyle(dataUrl),
        };

        this._fileReader.removeEventListener("load", this.fileLoaded);
    };

    setBackgroundImage(file: File) {
        if (!file) {
            this.previewStyle = {
                ...this.previewStyle,
                background: "none",
            };

            return;
        }

        this._fileReader.addEventListener("load", this.fileLoaded);
        this._fileReader.readAsDataURL(file);
    }

    openDialog() {
        this.file.nativeElement.click();
    }

    fileUpload(file: File) {
        this.value = file;
        this.onChange(file);
        this.setBackgroundImage(file);
    }
}
