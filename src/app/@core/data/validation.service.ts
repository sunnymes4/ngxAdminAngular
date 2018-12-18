import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable()

export class ValidationService {
    public static DateValidator(control: FormControl) {
        let controlValue = '';
        if (control.value && control.value._isAMomentObject) {
            const inputElementValue = control.value._i;
            controlValue = (typeof inputElementValue === 'string') ? inputElementValue : control.value.format('MM/DD/YYYY');
        }
        return !controlValue ? null : /^\d{2}\/\d{2}\/\d{4}$/.test(controlValue) ? null : { date: true };
    }
}
