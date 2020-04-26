import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ZoomImageModalComponent } from "./zoom-image-modal.component";

describe("ZoomImageModalComponent", () => {
    let component: ZoomImageModalComponent;
    let fixture: ComponentFixture<ZoomImageModalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ZoomImageModalComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ZoomImageModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
