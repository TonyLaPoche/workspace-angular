import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";

export const passwordMatchValidator: ValidatorFn = (group: AbstractControl<FormGroup>): ValidationErrors | null => {
    const password = group.get('password');
    const confirmPassword = group.get('passwordConfirm');
    if (password && confirmPassword && password.value !== confirmPassword.value) {
        return {passwordMismatch: true};
    }
    return null;
};

export const matchValidator = (matchTo: string, reverse?: boolean): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
        if (control.parent && reverse) {
            const c = (control.parent?.controls as any)[matchTo] as AbstractControl;
            if (c) {
                c.updateValueAndValidity();
            }
            return null;
        }
        return !!control.parent && !!control.parent.value && control.value === (control.parent?.controls as any)[matchTo].value ? null : {matching: true}
    }
}