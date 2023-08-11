import { Component, Input, OnDestroy } from '@angular/core';
import { Counterparty } from '../shared/models/counterparty.model';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject, distinctUntilChanged, takeUntil } from 'rxjs';

@Component({
  selector: 'app-counterparty-info',
  templateUrl: './counterparty-info.component.html',
  styleUrls: ['./counterparty-info.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: CounterpartyInfoComponent
    }
  ]
})
export class CounterpartyInfoComponent implements ControlValueAccessor, OnDestroy {
  @Input() counterparty!: Counterparty;
  checked!: boolean;
  
  control: FormControl = new FormControl(false);
  private onTouched: Function = () => {};
  private destroy$: Subject<boolean> = new Subject<boolean>();

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  writeValue(checked: boolean): void {
    this.control.setValue(checked, {emitEvent: false});
  }

  registerOnChange(onChange: Function): void {
    this.control.valueChanges.pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged()
      )
      .subscribe((checked) => onChange(checked));
  }

  registerOnTouched(onTouched: Function): void {
    this.onTouched = onTouched;
  }
  
}
