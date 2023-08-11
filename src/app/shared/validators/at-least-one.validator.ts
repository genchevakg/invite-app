import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function atLeastOneValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      (control.value);
      return Object.values(control.value)
        .some((selected) => selected) ? null : {noValueSelected: true};
    };
  }