import {delay, Observable, of, take} from "rxjs";
import {
    AbstractControl,
    AsyncValidatorFn,
    FormArray,
    FormControl,
    FormGroup,
    ValidationErrors,
    Validators
} from "@angular/forms";

export class RegexConstants {
    public static readonly URL = 'https?://.+';
    public static readonly DIGITS = '[0-9]';
}

export class UserForm {

    static buildUserForm() {
        return new FormGroup(
            {
                user: new FormGroup({
                    name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
                    lastName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
                    email: new FormControl('', [Validators.required, Validators.email]),
                    age: new FormControl('', [Validators.required, Validators.min(18), Validators.maxLength(100), Validators.pattern(RegexConstants.DIGITS)]),
                    phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
                    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
                    passwordConfirm: new FormControl('', [Validators.required]),
                }, [this.passwordMatchValidator]),
                address: new FormGroup({
                    street: new FormControl('', [Validators.required]),
                    city: new FormControl('', [Validators.required]),
                    zipcode: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{5}$')]),
                }),
                optional: new FormGroup({
                    newsletterSub: new FormControl(''),
                    newsletterFrequency: new FormControl('', Validators.required),
                    website: new FormControl('', Validators.pattern(RegexConstants.URL)),
                    birthDate: new FormControl('', Validators.required, [this.birthDateAsyncValidator()]),
                    gender: new FormControl('', Validators.required),
                    commentary: new FormControl(''),
                    hobbiesItems: new FormArray<FormControl>([
                        new FormControl('', [Validators.minLength(3)])
                    ])
                }),
            }
        );
    }

    static buildHobbyCtrl() {
        return new FormControl('', [Validators.minLength(3)]);
    }

    private static passwordMatchValidator(group: AbstractControl<FormGroup>): ValidationErrors | null {
        const password = group.get('password');
        const confirmPassword = group.get('passwordConfirm');
        if (password && confirmPassword && password.value !== confirmPassword.value) {
            return {passwordMismatch: true};
        }
        return null;
    };

    private static birthDateAsyncValidator(): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            const currentDate = new Date();
            const inputDate = new Date(control.value);

            const currentYears = currentDate.getFullYear();
            const currentMonths = currentDate.getMonth();
            const currentDay = currentDate.getDate();

            const inputDateYears = inputDate.getFullYear();
            const inputDateMonths = inputDate.getMonth();
            const inputDateDay = inputDate.getDate();

            const age = currentYears - inputDateYears;
            const hasHadBirthdayThisYear =
                currentMonths > inputDateMonths ||
                (currentMonths === inputDateMonths && currentDay >= inputDateDay);

            if (age < 18 || (age === 18 && hasHadBirthdayThisYear)) {
                return of({birthDate: '18 ans révolue exigé'}).pipe(
                    take(1),
                    delay(1000))
            }

            if (control.value.toISOString() < currentDate.toISOString()) {
                return of(null).pipe(
                    take(1),
                    delay(1000)
                )
            } else {
                return of({birthDate: 'Birth date invalid'}).pipe(
                    take(1),
                    delay(1000)
                )
            }
        }
    }
}


