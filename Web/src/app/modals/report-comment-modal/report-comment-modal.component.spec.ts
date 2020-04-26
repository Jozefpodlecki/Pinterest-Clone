import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCommentModalComponent } from './report-comment-modal.component';

describe('ReportCommentModalComponent', () => {
  let component: ReportCommentModalComponent;
  let fixture: ComponentFixture<ReportCommentModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportCommentModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportCommentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
