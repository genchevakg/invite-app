import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterpartyPreviewComponent } from './counterparty-preview.component';

describe('CounterpartyPreviewComponent', () => {
  let component: CounterpartyPreviewComponent;
  let fixture: ComponentFixture<CounterpartyPreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CounterpartyPreviewComponent]
    });
    fixture = TestBed.createComponent(CounterpartyPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
