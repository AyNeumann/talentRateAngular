import { AbstractControl } from '@angular/forms';

export class ScoreValidator {

    static scoreValidator(control: AbstractControl){
        const score: string = control.get('score').value;
        const obtainable: string = control.get('obtainable').value;
        if (score > obtainable) {
            control.get('score').setErrors({ ScoreInvalid: true });
        }
    }
}
