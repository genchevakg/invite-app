import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: CheckboxComponent
    }
  ]
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input() partialCheckbox: boolean = false;
  @Input() partialAnswer!: boolean;
  @Input() checked!: boolean;
  private onChange: Function = () => {};
  private onTouched: Function = () => {};

  toggleChecked(): void {
    this.checked = !this.checked;
    this.onChange(this.checked);
  }

  writeValue(checked: boolean): void {
    this.checked = checked;
  }

  registerOnChange(onChange: Function): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: Function): void {
    this.onTouched = onTouched;
  }
}
