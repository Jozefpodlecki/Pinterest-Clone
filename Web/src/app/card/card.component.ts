import { Component, HostBinding, OnInit, ElementRef, Input, HostListener, Output, EventEmitter } from '@angular/core';
import { faShareAlt, faUserPlus, faSearchPlus, faPlus, faFlag, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { createClipPath, computeBackgroundStyle } from '@utils';
import { CardAction } from '@models/CardAction';
import { Subscription } from 'rxjs';
import { WindowService } from '@services/window-service/window.service';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  CardAction = CardAction;
  faSearchPlus = faSearchPlus;
  faPlus = faPlus;
  faFlag = faFlag;
  faUserPlus = faUserPlus;
  faShareAlt = faShareAlt
  faTrash = faTrash;

  @Input() background: string;
  @Input() usersCount: number;
  @Output() action: EventEmitter<CardAction>;
  resizeSubscription: Subscription;

  backgroundStyle: object;
  clipPath: string;
  isActive: boolean;
  @Input() canAdd: boolean;
  @Input() canDelete: boolean;

  constructor(
    private sanitizer: DomSanitizer,
    private elementRef: ElementRef<HTMLDivElement>,
    private _windowService: WindowService) {
      this.action = new EventEmitter();
      this.backgroundStyle = {};
      this.isActive = false;
      this.canDelete = false;
      this.canAdd = false;
      this.usersCount = 0;
      this.clipPath = createClipPath();
  }

  ngOnDestroy(): void {
    this.resizeSubscription.unsubscribe();
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

  invokeAction(event: Event, action: CardAction) {
    event.stopPropagation();
    this.action.emit(action);
  }

  resizeCard() {
    const { width, height } = this.elementRef.nativeElement.getBoundingClientRect();
    this.backgroundStyle = {
      ...this.backgroundStyle,
      width: `${width}px`,
      height: `${height}px`,
      background: computeBackgroundStyle(this.background)
    }
  }

  ngOnInit(): void {
    this.resizeCard();

    this.resizeSubscription = this._windowService
      .onResize
      .subscribe(_ => {
        this.resizeCard();
      })
  }
}
