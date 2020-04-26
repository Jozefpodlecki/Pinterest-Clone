import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ShareImageModalComponent } from "./share-image-modal.component";

describe("ImageShareModalComponent", () => {
    let component: ShareImageModalComponent;
    let fixture: ComponentFixture<ShareImageModalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ShareImageModalComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ShareImageModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
