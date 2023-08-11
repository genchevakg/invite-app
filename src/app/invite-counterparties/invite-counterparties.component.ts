import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SelectCounterpartiesComponent } from '../select-counterparties/select-counterparties.component';
import { FormControl, Validators } from '@angular/forms';
import { CounterpartiesStateService } from '../shared/services/counterparties-state.service';
import { Observable } from 'rxjs';
import { CounterpartiesState } from '../shared/models/counterparties-state.model';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-invite-counterparties',
  templateUrl: './invite-counterparties.component.html',
  styleUrls: ['./invite-counterparties.component.scss']
})
export class InviteCounterpartiesComponent implements OnInit {
  email: FormControl = new FormControl('', [Validators.email]);
  areCounterpartiesSelected$!: Observable<boolean>;

  constructor(public dialog: MatDialog, private counterpartiesStateService: CounterpartiesStateService) {}

  ngOnInit(): void {
    this.areCounterpartiesSelected$ = this.counterpartiesStateService.areCounterpartiesSelected();
  }

  addEmail() {
    this.counterpartiesStateService.addEmail(this.email.value);
  }

  addCounterparties(groups: boolean = false) {
    this.dialog.open(SelectCounterpartiesComponent, {
      data: {groups},
    });
  }

  next(): void {
    this.dialog.open(ConfirmDialogComponent);
  }
}
