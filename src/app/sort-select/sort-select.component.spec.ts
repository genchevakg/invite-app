import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortSelectComponent } from './sort-select.component';

describe('SortSelectComponent', () => {
  let component: SortSelectComponent;
  let fixture: ComponentFixture<SortSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SortSelectComponent]
    });
    fixture = TestBed.createComponent(SortSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
