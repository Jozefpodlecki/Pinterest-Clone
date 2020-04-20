import { Component, OnInit, ElementRef, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { faTrash, faShareAlt, faUserPlus, faSearchPlus, faPlus, faFlag } from '@fortawesome/free-solid-svg-icons';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  faSearchPlus = faSearchPlus;
  faPlus = faPlus;
  faFlag = faFlag;
  faUserPlus = faUserPlus;
  faShareAlt = faShareAlt
  faTrash = faTrash;

  @Input() background: string;
  @Input() usersCount: number;
  @Output() zoomIn: EventEmitter<any>;
  @Output() addImage: EventEmitter<any>;
  @Output() shareImage: EventEmitter<any>;
  @Output() removeImage: EventEmitter<any>;
  @Output() reportImage: EventEmitter<any>;

  backgroundStyle: object;
  isActive: boolean;

  constructor(
    private sanitizer: DomSanitizer,
    private elementRef: ElementRef<HTMLDivElement>) {
      this.zoomIn = new EventEmitter();
      this.addImage = new EventEmitter();
      this.shareImage = new EventEmitter();
      this.removeImage = new EventEmitter();
      this.reportImage = new EventEmitter();
      this.backgroundStyle = {};
      this.isActive = false;
      this.usersCount = 0;
  }

  @HostListener('mouseenter') onEnter() {
    this.isActive = true;
  }

  @HostListener('mouseleave') onLeave() {
    this.isActive = false;
  }

  ngOnInit(): void {
    const { width, height } = this.elementRef.nativeElement.getBoundingClientRect();
    this.backgroundStyle = {
      ...this.backgroundStyle,
      width: `${width}px`,
      height: `${height}px`,
      background: `url(${this.background}) center center / cover no-repeat`
    }
  }

}
