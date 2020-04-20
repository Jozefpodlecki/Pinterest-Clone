import { Component, HostBinding, OnInit, ElementRef, Input, HostListener, Output, EventEmitter } from '@angular/core';
import { faShareAlt, faUserPlus, faSearchPlus, faPlus, faFlag } from '@fortawesome/free-solid-svg-icons';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { createClipPath } from 'src/utils';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  faSearchPlus = faSearchPlus;
  faPlus = faPlus;
  faFlag = faFlag;
  faUserPlus = faUserPlus;
  faShareAlt = faShareAlt

  @Input() background: string;
  @Output() zoomIn: EventEmitter<any>;
  @Output() addImage: EventEmitter<any>;
  @Output() reportImage: EventEmitter<any>;
  @Output() shareImage: EventEmitter<any>;

  backgroundStyle: object;
  clipPath: string;
  isActive: boolean;
  usersCount: number;

  constructor(
    private sanitizer: DomSanitizer,
    private elementRef: ElementRef<HTMLDivElement>) {
      this.clipPath = createClipPath();
      this.backgroundStyle = {};
      this.isActive = false;
      this.usersCount = 0;
      this.zoomIn = new EventEmitter();
      this.addImage = new EventEmitter();
      this.reportImage = new EventEmitter();
      this.shareImage = new EventEmitter();
    }

  @HostListener('mouseenter') onEnter() {
    this.isActive = true;
  }

  @HostListener('mouseleave') onLeave() {
    this.isActive = false;
  }

  @HostBinding('style.clip-path')
  get baseStyle(): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(this.clipPath);
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
