import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCounterpartiesComponent } from './select-counterparties.component';

describe('SelectCounterpartiesComponent', () => {
  let component: SelectCounterpartiesComponent;
  let fixture: ComponentFixture<SelectCounterpartiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectCounterpartiesComponent]
    });
    fixture = TestBed.createComponent(SelectCounterpartiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
