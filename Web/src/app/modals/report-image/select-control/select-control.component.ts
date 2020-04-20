import { Component, OnInit, Input } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { trackById } from 'src/utils';

@Component({
  selector: 'select-control',
  templateUrl: './select-control.component.html',
  styleUrls: ['./select-control.component.scss']
})
export class SelectControlComponent implements OnInit, ControlValueAccessor  {
  trackById = trackById;
  
  @Input() defaultValue: any;
  @Input() currentValue: string;
  @Input("values") options: any[];

  constructor() {
    this.options = [];
    this.currentValue = '';
    this.defaultValue = null;
  }

  writeValue(option: any): void {
    
  }

  registerOnChange(fn: any): void {
    
  }
  
  registerOnTouched(fn: any): void {
    
  }
  
  setDisabledState?(isDisabled: boolean): void {
    
  }

  ngOnInit(): void {
  }
}
