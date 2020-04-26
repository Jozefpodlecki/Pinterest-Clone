import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCommentFormComponent } from './report-comment-form.component';

describe('ReportCommentFormComponent', () => {
  let component: ReportCommentFormComponent;
  let fixture: ComponentFixture<ReportCommentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportCommentFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportCommentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
