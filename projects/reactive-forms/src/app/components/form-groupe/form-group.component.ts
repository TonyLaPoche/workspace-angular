import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
    selector: 'app-form-group',
    standalone: true,
    imports: [
        ReactiveFormsModule,
    ],
    templateUrl: 'form-group.component.html',
    styles: ``,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormGroupComponent {
    registerForm = new FormGroup(
        {
            user: new FormGroup({
                name: new FormControl(''),
                lastName: new FormControl(''),
                email: new FormControl(''),
            }),
            address: new FormGroup({
                city: new FormControl(''),
                state: new FormControl(''),
                zipcode: new FormControl(''),
                country: new FormControl(''),
            })
        }
    );

    submitAuth() {
        console.info(this.registerForm.value)
    }
}
