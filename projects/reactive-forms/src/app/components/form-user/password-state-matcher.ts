import {ErrorStateMatcher} from "@angular/material/core";
import {AbstractControl, FormGroupDirective, NgForm} from "@angular/forms";

export class PasswordStateMatcher implements ErrorStateMatcher {
    isErrorState(control: AbstractControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const password = form?.control.get('user')?.get('password')
        const passwordConfirm = form?.control.get('user')?.get('passwordConfirm')

        return (control?.errors || form?.control.get('user')?.errors?.['passwordMismatch']) && (password?.touched && passwordConfirm?.touched);
    }
}