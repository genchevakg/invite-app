import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandingPanelComponent } from './expanding-panel.component';

describe('ExpandingPanelComponent', () => {
  let component: ExpandingPanelComponent;
  let fixture: ComponentFixture<ExpandingPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpandingPanelComponent]
    });
    fixture = TestBed.createComponent(ExpandingPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
