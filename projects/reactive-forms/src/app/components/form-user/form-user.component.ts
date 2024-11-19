import {ChangeDetectionStrategy, Component} from '@angular/core';
import {
    AbstractControl,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    ValidationErrors,
    ValidatorFn,
    Validators
} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";

@Component({
    selector: 'app-form-user',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        MatInput,
    ],
    templateUrl: 'form-user.component.html',
    styles: ``,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormUser {
    // TODO - Move to on a file Validator.ts
    passwordMatchValidator: ValidatorFn = (group: AbstractControl<FormGroup>): ValidationErrors | null => {
        const password = group.get('password');
        const confirmPassword = group.get('passwordConfirm');
        if (password && confirmPassword && password.value !== confirmPassword.value) {
            return { passwordMismatch: true };
        }
        return null;
    };

    registerForm = new FormGroup(
        {
            user: new FormGroup({
                name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
                lastName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
                email: new FormControl('', [Validators.required, Validators.email]),
                age: new FormControl('', [Validators.required, Validators.min(18), Validators.maxLength(100)]),
                phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
                password: new FormControl('', [Validators.required, Validators.minLength(8)]),
                passwordConfirm: new FormControl('',[Validators.required] ),
            }, {validators: this.passwordMatchValidator}),
            address: new FormGroup({
                street: new FormControl('', [Validators.required]),
                city: new FormControl('', [Validators.required]),
                zipcode: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{5}$')]),
            })
        }
    );



    submitAuth() {
        console.info(this.registerForm.value)
    }
}
