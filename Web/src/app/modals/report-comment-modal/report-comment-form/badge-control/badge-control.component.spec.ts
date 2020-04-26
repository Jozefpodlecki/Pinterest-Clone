import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { BadgeControlComponent } from "./badge-control.component";

describe("BadgeControlComponent", () => {
    let component: BadgeControlComponent;
    let fixture: ComponentFixture<BadgeControlComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BadgeControlComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BadgeControlComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
