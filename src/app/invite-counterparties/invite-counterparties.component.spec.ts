import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteCounterpartiesComponent } from './invite-counterparties.component';

describe('InviteCounterpartiesComponent', () => {
  let component: InviteCounterpartiesComponent;
  let fixture: ComponentFixture<InviteCounterpartiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InviteCounterpartiesComponent]
    });
    fixture = TestBed.createComponent(InviteCounterpartiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
