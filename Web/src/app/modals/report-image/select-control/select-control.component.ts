import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { trackById } from '@utils';
import { ReportReason } from '@models/ReportReason';

@Component({
  selector: 'select-control',
  templateUrl: './select-control.component.html',
  styleUrls: ['./select-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectControlComponent),
      multi: true
    }
  ]
})
export class SelectControlComponent implements ControlValueAccessor  {
  trackById = trackById;
  
  @Input() defaultValue: ReportReason;
  currentValue: ReportReason;
  @Input("values") options: ReportReason[];
  isPopupOpen: boolean;

  constructor() {
    this.options = [];
    this.isPopupOpen = false;
    this.defaultValue = {
      id: -1,
      title: '',
      description: ''
    };
    this.currentValue = this.defaultValue;
  }

  onChange(value: any) {

  }

  onTouch() {

  }

  writeValue(option: any): void {
    if(!option) {
      this.currentValue = this.defaultValue;
      return;
    }
    
  }

  registerOnChange(callback: () => void): void {
    this.onChange = callback;
  }
  
  registerOnTouched(callback: () => void): void {
    this.onTouch = callback;
  }
  
  setDisabledState?(isDisabled: boolean): void {
    
  }

  selectOption(option: any) {
    this.currentValue = option;
    this.toggleDropdown();
    this.onChange(this.currentValue);
  }

  toggleDropdown() {
    this.isPopupOpen = !this.isPopupOpen;
  }
}
