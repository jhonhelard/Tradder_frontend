import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CompareOperator } from 'src/app/core/constants/app.const';

export function compareValidator(controlNameToCompare: string, compareOperator = CompareOperator.NotEqual): ValidatorFn {
  return (c: AbstractControl): ValidationErrors | null => {
    if (!c.value && c.value === "")
      return;

    let compareControl: AbstractControl = c.root.get(controlNameToCompare);
    if (compareControl) {
      const subcription: Subscription = compareControl.valueChanges.subscribe(() => {
        c.updateValueAndValidity();
        subcription.unsubscribe();
      });
    }

    let ret = null;
    if (compareControl) {
      switch (compareOperator) {
        case CompareOperator.NotEqual:
          ret = compareControl.value !== c.value ? { 'compare': true } : null;
          break;
        case CompareOperator.Equal:
          ret = compareControl.value === c.value ? { 'compare': true } : null;
          break;
        default:
          break;
      }
    }
    return ret;
  };
}

@Directive({
  selector: '[compare]',
  providers: [{ provide: NG_VALIDATORS, useExisting: CompareValidatorDirective, multi: true }]
})
export class CompareValidatorDirective implements Validator {

  @Input("compare") controlNameToCompare: string;
  @Input("operator") compareOperator;
  constructor() {

  }

  validate(c: AbstractControl): ValidationErrors | null {
    return compareValidator(this.controlNameToCompare, this.compareOperator)(c);
  }
}
