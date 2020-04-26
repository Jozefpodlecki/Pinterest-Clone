import { Component, OnInit, ViewChild, ElementRef, AfterContentInit, AfterViewInit } from '@angular/core';
import { Validators, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { faSave, faEdit, faUpload } from '@fortawesome/free-solid-svg-icons';
import UserService from '@services/user-service';
import { computeBackgroundStyle } from '@utils';
import ImageService from '@services/image-service';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, AfterViewInit {
  faUpload = faUpload;
  faSave = faSave;
  faEdit = faEdit;

  settingsForm: FormGroup;
  aboutMe: FormControl;
  displayName: FormControl;
  email: FormControl;
  isEditingAboutMe: boolean;
  isEditingEmail: boolean;
  isEditingDisplayName: boolean;
  hasImageChanged: boolean;
  previewStyle: any;
  oldBackground: string;
  background: string;
  file: File;

  @ViewChild('fileRef') fileRef: ElementRef<HTMLInputElement>;
  @ViewChild('fileContainerRef') fileContainerRef: ElementRef<HTMLInputElement>;

  @ViewChild('aboutMeRef')
  set setAboutMeRef(aboutMeRef: ElementRef<HTMLTextAreaElement>) {
    if(aboutMeRef) {
      aboutMeRef.nativeElement.focus();
    }
  }

  @ViewChild('emailRef') 
  set setEmailRef(emailRef: ElementRef<HTMLInputElement>) {
    if(emailRef) {
      emailRef.nativeElement.focus();
    }
  }

  @ViewChild('displayNameRef') 
  set setDisplayNameRef(displayNameRef: ElementRef<HTMLInputElement>) {
    if(displayNameRef) {
      displayNameRef.nativeElement.focus();
    }
  }

  constructor(
    private _userService: UserService,
    private _imageService: ImageService,
    private _fileReader: FileReader
  ) {

    this.aboutMe = new FormControl({value: '', disabled: true }, [Validators.maxLength(50)]);
    this.displayName = new FormControl({value: '', disabled: true }, [Validators.required]);
    this.email = new FormControl({value: '', disabled: true }, [Validators.email, Validators.required]);
    this.isEditingAboutMe = false;
    this.isEditingEmail = false;
    this.isEditingDisplayName = false;
    this.hasImageChanged = false;
    this.previewStyle = {};
    this.file = null;

    this.settingsForm = new FormGroup({
      aboutMe: this.aboutMe,
      displayName: this.displayName,
      email: this.email
    });

    this._userService.getProfile()
      .subscribe(profile => {
        this.aboutMe.setValue(profile.aboutMe);
        this.email.setValue(profile.email);
        this.displayName.setValue(profile.displayName);
        this.oldBackground = profile.background;

        if(this.oldBackground) {
          this.previewStyle = {
            ...this.previewStyle,
            background: computeBackgroundStyle(this.oldBackground)
          }
        }
        
      })
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const { width, height } = this.fileContainerRef.nativeElement.getBoundingClientRect();
    this.previewStyle = {
      ...this.previewStyle,
      width: `${width}px`,
      height: `${height}px`,
    }
  }

  fileDrop(event: DragEvent) {

  }

  openDialog() {
    this.fileRef.nativeElement.click();
  }

  saveImage() {
    this._userService.updateProfile({
      
    }).subscribe(_ => {
      
    });
  }

  setBackgroundImage(file: File) {

    if(!file) {
      this.previewStyle = {
        ...this.previewStyle,
        background: computeBackgroundStyle(this.oldBackground)
      }

      return;
    }

    this._fileReader.addEventListener("load", this.fileLoaded);
    this._fileReader.readAsDataURL(file);
  }

  fileLoaded = () => {
    const dataUrl = this._fileReader.result;
    this.previewStyle = {
      ...this.previewStyle,
      background: computeBackgroundStyle(dataUrl)
    }

    this._fileReader.removeEventListener("load", this.fileLoaded);
  }

  fileUpload(file: File) {
    this.file = file;

    if(!file) {
      this.hasImageChanged = false;
    }
    else {
      this.hasImageChanged = true;
    }

    this.setBackgroundImage(file);
  }

  set(property: keyof SettingsComponent, value: boolean) {    
    const control = this[property] as AbstractControl;

    if(value) {
      control.enable();
    }
    else {
      const data = {
        [property]: control.value
      }

      this._userService.updateProfile(data)
        .subscribe(pr => {

        })

      control.disable();
    }
  }
}
