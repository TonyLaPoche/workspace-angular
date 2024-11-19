import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
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
    registerForm = new FormGroup(
        {
            user: new FormGroup({
                name: new FormControl(''),
                lastName: new FormControl(''),
                email: new FormControl(''),
                age: new FormControl(''),
                phoneNumber: new FormControl(''),
                password: new FormControl(''),
                passwordConfirm: new FormControl(''),
            }),
            address: new FormGroup({
                street: new FormControl(''),
                city: new FormControl(''),
                zipcode: new FormControl(''),
            })
        }
    );

    submitAuth() {
        console.info(this.registerForm.value)
    }
}
