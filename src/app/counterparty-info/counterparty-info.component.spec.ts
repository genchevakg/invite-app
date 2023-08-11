import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterpartyInfoComponent } from './counterparty-info.component';

describe('CounterpartyInfoComponent', () => {
  let component: CounterpartyInfoComponent;
  let fixture: ComponentFixture<CounterpartyInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CounterpartyInfoComponent]
    });
    fixture = TestBed.createComponent(CounterpartyInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
