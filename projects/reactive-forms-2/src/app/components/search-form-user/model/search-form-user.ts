import {FormControl, FormGroup, Validators} from "@angular/forms";


export class RegexConstants {
    public static readonly STRING_SPECIAL_CHAR = '^[A-Za-zÀ-ÖØ-öø-ÿ ]+$';
    public static readonly DIGITS = '^[0-9]+$';
}

export class SearchFormUser {
    /** Constants */
    public static readonly AGE_MIN = 18;
    public static readonly AGE_MAX = 100;

    static buildUSerForm() {
        return new FormGroup(
            {
                name: new FormControl('', [Validators.required, Validators.maxLength(100), Validators.pattern(RegexConstants.STRING_SPECIAL_CHAR)]),
                age: new FormGroup({
                    min: new FormControl(this.AGE_MIN, {
                        validators: [Validators.min(this.AGE_MIN), Validators.maxLength(this.AGE_MAX), Validators.pattern(RegexConstants.DIGITS)],
                        nonNullable: true

                    }),
                    max: new FormControl(this.AGE_MAX, {
                        validators: [
                            Validators.min(this.AGE_MIN),
                            Validators.maxLength(this.AGE_MAX),
                            Validators.pattern(RegexConstants.DIGITS)
                        ],
                        nonNullable: true
                    })
                }),
                cities: new FormControl(['']),
            }
        )
    }
}