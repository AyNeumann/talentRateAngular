import { AbstractControl } from '@angular/forms';

export class ScoreValidator {

    static scoreValidator(control: AbstractControl){
        const score: number = Number(control.get('score').value);
        const obtainable: number = Number(control.get('obtainable').value);
        if (score > obtainable) {
            control.get('score').setErrors({ ScoreInvalid: true });
        }
    }
}
