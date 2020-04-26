import { Component, OnInit, Input, ElementRef, HostListener, HostBinding } from '@angular/core';
import { Category } from '@models/Category';
import { computeBackgroundStyle } from '@utils';

@Component({
  selector: 'category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  @Input() category: Category;
  @Input() selected: boolean;
  backgroundStyle: object;
  isActive: boolean;

  constructor(
    private elementRef: ElementRef<HTMLDivElement>
    ) {
      this.isActive = false;
      this.backgroundStyle = {};
    }

  @HostListener('mouseenter')
  onEnter() {
    this.isActive = true;
  }

  @HostListener('mouseleave')
  onLeave() {
    this.isActive = false;
  }

  @HostBinding('class.selected')
  get isSelected() {
    return this.selected;
  }

  ngOnInit(): void {
    const { width, height } = this.elementRef.nativeElement.getBoundingClientRect();
    this.backgroundStyle = {
      ...this.backgroundStyle,
      width: `${width}px`,
      height: `${height}px`,
      background: computeBackgroundStyle(this.category.link)
    }
  }

}
