import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Counterparty } from '../shared/models/counterparty.model';
import { Observable, Subject, distinctUntilChanged, take, takeUntil, takeWhile, tap } from 'rxjs';
import { CounterpartiesService } from '../shared/services/counterparties.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { atLeastOneValidator } from '../shared/validators/at-least-one.validator';
import { SelectCounterpartiesData } from '../shared/models/select-counterparties-data.model';
import { CheckboxStatus } from '../shared/enums/checkbox-status.enum';
import { CamelCasePipe } from '../shared/pipes/camel-case/camel-case.pipe';
import { SelectCounterpartyFormGroup } from '../shared/models/select-counterparty-form-group.model';
import { UtilityService } from '../shared/services/utility.service';
import { SortOrder } from '../shared/enums/sort-order.enum';
import { CounterpartiesStateService } from '../shared/services/counterparties-state.service';
import { CounterpartiesState } from '../shared/models/counterparties-state.model';

@Component({
  selector: 'app-select-counterparties',
  templateUrl: './select-counterparties.component.html',
  styleUrls: ['./select-counterparties.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectCounterpartiesComponent implements OnInit, OnDestroy {
  counterparties$!: Observable<CounterpartiesState>;
  //numbers: string[] = new Array(1000).fill('');
  formGroup!: FormGroup;
  sortOrder!: SortOrder;

  private prevValue!: SelectCounterpartyFormGroup;
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    public dialogRef: MatDialogRef<SelectCounterpartiesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectCounterpartiesData,
    private counterpartiesStateService: CounterpartiesStateService,
    private fb: FormBuilder,
    private utilityService: UtilityService
  ) {}

  ngOnInit(): void {
    this.counterparties$ = this.counterpartiesStateService.getCounterparties()
      .pipe(
        takeWhile(({loading}) => loading, true),
        tap(({counterparties, }) => {
          if (counterparties?.length) {
            this.setFormGroup(counterparties);
          }
        })
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  selectCounterparties(counterparties: Counterparty[], checked: boolean): void {
    const unpdatedValue: {[key:string]: boolean;} = {...this.formGroup.value};
    const ids: string[] = counterparties.map((counterparty: Counterparty) => counterparty._id);

    for (let controlName in unpdatedValue) {
      if (ids.includes(this.getCounterpartyId(controlName))) {
        unpdatedValue[controlName] = checked;
      }
    }
    this.prevValue = unpdatedValue;
    this.formGroup.setValue(unpdatedValue);
  }

  confirmSelection() {
    const selectedIds: Set<string> = new Set(Object.entries(this.formGroup.value)
      .filter(([, checked]) => checked)
      .map(([controlName, ]) => !this.data.groups ? controlName : this.getCounterpartyId(controlName)));
    this.counterpartiesStateService.setSelectedCounterparties(Array.from(selectedIds));
    this.dialogRef.close();
  }

  close(): void {
    this.dialogRef.close();
  }

  private setFormGroup(counterparties: Counterparty[]): void {
    const formGroupValues: SelectCounterpartyFormGroup = this.getFormGroupStructure(counterparties)
    this.formGroup = this.fb.group(formGroupValues, {validators: atLeastOneValidator()});
    this.handleGroupValueUpdates(formGroupValues);
  }

  private getFormGroupStructure(counterparties: Counterparty[]): SelectCounterpartyFormGroup {
    const controlEntries: [string, boolean][] = [];
    counterparties.forEach((counterparty: Counterparty) => {
      if (this.data.groups && counterparty.groups) {
        counterparty.groups.forEach((groupName:string) => 
          controlEntries.push([this.getFormControlName(groupName, counterparty._id), false])
        );
      } else {
        controlEntries.push([counterparty._id, false]);
      }
    })
    return Object.fromEntries(controlEntries);
  }

  private handleGroupValueUpdates(initialValues: SelectCounterpartyFormGroup): void {
    if(this.data.groups) {
      this.prevValue = initialValues;
      this.formGroup.valueChanges.pipe(
          takeUntil(this.destroy$),
          distinctUntilChanged((prev, current) => JSON.stringify(prev) === JSON.stringify(current))
        )
        .subscribe((value: SelectCounterpartyFormGroup) => this.updateValuesInGroups(value));
    }
  }

  private updateValuesInGroups(currentValue: SelectCounterpartyFormGroup): void {
    const prevEntries: [string, boolean][] = Object.entries(this.prevValue);
    const changedEntries: [string, boolean][] = Object.entries(currentValue)
      .filter(([controlName, checked], index) => prevEntries[index][0] === controlName && prevEntries[index][1] !== checked);
    if (changedEntries.length > 0) {
      const updatedValue: SelectCounterpartyFormGroup = {...currentValue};
      changedEntries.forEach(([updatedControlName, updatedControlValue]: [string, boolean]) => {
        const id: string = this.getCounterpartyId(updatedControlName);
        for (let controlName in updatedValue) {
          if(controlName.startsWith(id)) {
            updatedValue[controlName] = updatedControlValue;
          }
        }
      });
      this.prevValue = updatedValue;
      this.formGroup.setValue(updatedValue);
    }
  }

  private getFormControlName(groupName: string, counterPartyId: string) {
    return `${counterPartyId}-${this.utilityService.toCamelCase(groupName)}`
  }

  private getCounterpartyId(controlName: string) {
    return controlName.substring(0, controlName.indexOf('-'));
  }

}
