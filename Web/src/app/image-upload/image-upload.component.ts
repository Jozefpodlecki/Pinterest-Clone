import { Component, OnInit, HostListener, HostBinding, ViewChild, ElementRef, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {
  faUpload = faUpload;

  @Output() fileSelected = new EventEmitter();
  @ViewChild('file') file: ElementRef<HTMLInputElement>;
  
  @HostBinding('style.background') private background: SafeStyle;
  @HostBinding('style.opacity') private opacity = '1'

  @HostListener('dragover', ['$event'])
  public onDragOver(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }
	
  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }
	
  @HostListener('drop', ['$event'])
  public onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    
    const { files: [file] = [] as any } = event.dataTransfer;
    
    if(!file || file.type !== "image/jpeg") {
      return;
    }

    this.setBackgroundImage(file);
  }

  constructor(private _sanitizer: DomSanitizer) {
  }

  setBackgroundImage(file: File) {

    if(!file) {
      this.background = this._sanitizer.bypassSecurityTrustStyle('');
      return;
    }

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const dataUrl = reader.result;
      const background = `url(${dataUrl}) center center / cover no-repeat`;
      this.background = this._sanitizer.bypassSecurityTrustStyle(background);
      this.opacity = '1';

    }, false);
  
    reader.readAsDataURL(file);
  }

  ngOnInit(): void {
  }

  openDialog() {
    this.file.nativeElement.click();
  }

  fileUpload(file: File) {
    this.setBackgroundImage(file);
  }

}
