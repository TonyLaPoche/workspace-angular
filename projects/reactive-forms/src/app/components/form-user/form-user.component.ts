import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField, MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {AsyncPipe, DatePipe, JsonPipe} from "@angular/common";
import {MatButton, MatFabButton, MatIconButton, MatMiniFabButton} from "@angular/material/button";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatListOption, MatSelectionList} from "@angular/material/list";
import {MatIcon} from "@angular/material/icon";
import {MatDivider} from "@angular/material/divider";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {FormUserService} from "./form-user.service";
import {passwordMatchValidator, PasswordStateMatcher} from "./form-user.validators";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";


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
        MatListOption,
        MatSelectionList,
        FormsModule,
        MatSuffix,
        MatIconButton,
        MatIcon,
        MatFabButton,
        MatDivider,
        MatMiniFabButton,
        MatHint,
        DatePipe,
        MatDatepickerInput,
        MatDatepicker,
        MatDatepickerToggle,
        AsyncPipe,
        MatRadioGroup,
        MatRadioButton,
    ],
    templateUrl: 'form-user.component.html',
    styles: ``,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormUser {

    formUserService = inject(FormUserService);


    registerForm = new FormGroup(
        {
            user: new FormGroup({
                name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
                lastName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
                email: new FormControl('', [Validators.required, Validators.email]),
                age: new FormControl('', [Validators.required, Validators.min(18), Validators.maxLength(100), Validators.pattern('[0-9]')]),
                phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
                password: new FormControl('', [Validators.required, Validators.minLength(8)]),
                passwordConfirm: new FormControl('', [Validators.required]),
            }, [passwordMatchValidator]),
            address: new FormGroup({
                street: new FormControl('', [Validators.required]),
                city: new FormControl('', [Validators.required]),
                zipcode: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{5}$')]),
            }),
            optional: new FormGroup({
                newsletterSub: new FormControl(''),
                newsletterFrequency: new FormControl('', Validators.required),
                website: new FormControl('', Validators.pattern('https?://.+')),
                birthDate: new FormControl('', Validators.required, [this.formUserService.checkBirthDateValidity]),
                gender: new FormControl('', Validators.required),
                commentary: new FormControl(''),
                hobbiesItems: new FormArray<FormControl>([
                    new FormControl('', [Validators.minLength(3)])
                ], [Validators.maxLength(4)])
            }),
        }
    );

    userForm = this.registerForm.controls.user;
    addressForm = this.registerForm.controls.address;
    optionalForm = this.registerForm.controls.optional;
    hobbiesForm = this.optionalForm.controls.hobbiesItems;
    today = new Date().getDate()
    passwordStateMatcher = new PasswordStateMatcher();

    constructor() {
        this.optionalForm.controls.newsletterSub.valueChanges.pipe(
            takeUntilDestroyed()
        ).subscribe(
            isSub => {
                this.optionalForm.controls.newsletterFrequency.reset()
            }
        )
    }

    createHobbyCtrl(value = '') {
        return new FormControl(value, [Validators.required, Validators.minLength(3)])
    }

    addHobby() {
        const b = this.hobbiesForm.hasError('maxlength');
        if (!b) {
            this.hobbiesForm.push(this.createHobbyCtrl())
        }
    }

    removeHobby(index: number) {
        this.hobbiesForm.removeAt(index);
    }

    submitAuth() {
        this.registerForm.markAllAsTouched();
        if (this.registerForm.valid) {
            console.info(this.registerForm.getRawValue())
        }
    }
}
