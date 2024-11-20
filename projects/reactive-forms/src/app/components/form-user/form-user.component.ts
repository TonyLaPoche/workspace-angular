import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {matchValidator} from "./form-user.validators";
import {JsonPipe} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatOption, MatSelect} from "@angular/material/select";

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
        MatButton,
        MatCheckbox,
        MatSelect,
        MatOption,
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
                passwordConfirm: new FormControl('', [Validators.required, matchValidator('password')]),
            }),
            address: new FormGroup({
                street: new FormControl('', [Validators.required]),
                city: new FormControl('', [Validators.required]),
                zipcode: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{5}$')]),
            }),
            optional: new FormGroup({
                newsletterSub: new FormControl(''),
                newsletterFrequency: new FormControl('', Validators.required),
                website: new FormControl('', Validators.pattern('https?://.+')),
                birthDate: new FormControl('', Validators.required),
                gender: new FormControl('', Validators.required),
                commentary: new FormControl('')
            }),
            hobbies: new FormArray([
                new FormControl('hobby')
            ])

        }
    );

    userForm = this.registerForm.controls.user;
    addressForm = this.registerForm.controls.address;
    optionalForm = this.registerForm.controls.optional;
    hobbiesForm = this.registerForm.controls.hobbies;

    submitAuth() {
        console.info(this.registerForm.value)
    }
}
