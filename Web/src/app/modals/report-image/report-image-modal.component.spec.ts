import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportImageModalComponent } from './report-image-modal.component';

describe('ReportImageModalComponent', () => {
    let component: ReportImageModalComponent;
    let fixture: ComponentFixture<ReportImageModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [ReportImageModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
      fixture = TestBed.createComponent(ReportImageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
