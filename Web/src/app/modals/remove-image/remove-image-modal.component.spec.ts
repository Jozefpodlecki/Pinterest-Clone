import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveImageModalComponent } from './remove-image-modal.component';

describe('RemoveImageModalComponent', () => {
    let component: RemoveImageModalComponent;
    let fixture: ComponentFixture<RemoveImageModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [RemoveImageModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
      fixture = TestBed.createComponent(RemoveImageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
