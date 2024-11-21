import {AbstractControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";

export class PasswordStateMatcher implements ErrorStateMatcher {
    isErrorState(control: AbstractControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const password = form?.control.get('user')?.get('password')
        const passwordConfirm = form?.control.get('user')?.get('passwordConfirm')

        return (control?.errors || form?.control.get('user')?.errors?.['passwordMismatch']) && (password?.touched && passwordConfirm?.touched)  ;
    }
}

export const passwordMatchValidator: ValidatorFn = (group: AbstractControl<FormGroup>): ValidationErrors | null => {
    const password = group.get('password');
    const confirmPassword = group.get('passwordConfirm');
    if (password && confirmPassword && password.value !== confirmPassword.value) {
        return {passwordMismatch: true};
    }
    return null;
};