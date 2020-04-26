import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges, HostListener, HostBinding, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'base-modal',
  template: '',
  styles: [''],
  animations: [
    trigger('fade', [
      state('true', style({
        opacity: '1',
        zIndex: '1'
      })),
      state('false', style({
        opacity: '0',
        zIndex: '-1'
      })),
      transition('* <=> *', animate(300))
    ])
  ]
})
export class BaseModalComponent implements OnInit, OnChanges {

  @Input() isActive: boolean;
  @Output() isActiveChange: EventEmitter<boolean>;
  @Input() modalData: any;

  constructor(
    @Inject(DOCUMENT) private _document: Document
    ) {
    this.isActive = false;
    this.isActiveChange = new EventEmitter();
  }

  @HostBinding('@fade')
  get fade() {
    return this.isActive;
  }

  @HostBinding('style.top')
  get getHeight() {
    return `${this._document.documentElement.scrollTop}px`;
  }

  @HostListener('click', ['$event'])
  onClick(event: _MouseEvent<HTMLDivElement>) {
    if(event.target.classList.contains('is-active')) {
      this.closeModal()
    }
  }

  closeModal() {
    this.isActive = false;
    this.isActiveChange.emit();
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(!this.modalData) {
      return;
    }

    this.onChanges(this.modalData);
  }

  onChanges(modalData: any) {

  }
}
