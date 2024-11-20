import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {matchValidator, passwordMatchValidator} from "./form-user.validators";
import {JsonPipe} from "@angular/common";

@Component({
    selector: 'app-form-user',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        MatInput,
        MatError,
        JsonPipe,
    ],
    templateUrl: 'form-user.component.html',
    styles: ``,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormUser {



    registerForm = new FormGroup(
        {
            user: new FormGroup({
                name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
                lastName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
                email: new FormControl('', [Validators.required, Validators.email]),
                age: new FormControl('', [Validators.required, Validators.min(18), Validators.maxLength(100)]),
                phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
                password: new FormControl('', [Validators.required, Validators.minLength(8), matchValidator('passwordConfirm', true)]),
                passwordConfirm: new FormControl('', [Validators.required,  matchValidator('password')]),
            }, {validators: passwordMatchValidator}),
            address: new FormGroup({
                street: new FormControl('', [Validators.required]),
                city: new FormControl('', [Validators.required]),
                zipcode: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{5}$')]),
            })
        }
    );

    userForm = this.registerForm.controls.user;
    addressForm = this.registerForm.controls.address;

    submitAuth() {
        console.info(this.registerForm.value)
    }
}
