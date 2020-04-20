import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges, HostListener, HostBinding, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'base-modal',
  template: '',
  styles: ['']
})
export class BaseModalComponent implements OnInit, OnChanges {

  @Input() isActive: boolean;
  @Output() closeModal: EventEmitter<any>;
  @Input() modalData: any;

  constructor(
    @Inject(DOCUMENT) private _document: Document
    ) {
    this.isActive = false;
    this.closeModal = new EventEmitter();
  }

  @HostBinding('class.is-active')
  get isActiveClass() {
    return this.isActive;
  }

  @HostBinding('style.top')
  get getHeight() {
    return `${this._document.documentElement.scrollTop}px`;
  }

  @HostListener('click', ['$event'])
  onClick(event: _MouseEvent<HTMLDivElement>) {
    if(event.target.className === 'is-active') {
      this.closeModal.emit();
    }
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
