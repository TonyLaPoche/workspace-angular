import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
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
import {UserForm} from "./model/user-form";
import {PasswordStateMatcher} from "./password-state-matcher";
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

    /** Form */
    readonly registerForm = UserForm.buildUserForm();

    /** Sub Form Getters */
    readonly userForm = this.registerForm.controls.user;
    readonly addressForm = this.registerForm.controls.address;
    readonly optionalForm = this.registerForm.controls.optional;
    readonly hobbiesForm = this.optionalForm.controls.hobbiesItems;

    /** Password Form Error Manager */
    readonly passwordStateMatcher = new PasswordStateMatcher();

    /** Constants */
    private readonly MAX_HOBBIES = 5;

    constructor() {
        this.manageNewsletterState();
    }

    /**
     * Permet d'ajouter un nouveau hobby au clique sur le bouton d'ajout
     */
    addHobby(): void {
        if (this.hobbiesForm.length <= this.MAX_HOBBIES) {
            this.hobbiesForm.push(UserForm.buildHobbyCtrl())
        }
    }

    /**
     * Permet de supprimer un hobby au clique sur le bouton de suppression
     * @param index Position de l'élément à supprimer
     */
    removeHobby(index: number): void {
        this.hobbiesForm.removeAt(index);
    }

    /**
     * Envoie le formulaire au back-end
     */
    submitRegisterForm(): void {
        this.registerForm.markAllAsTouched();
        if (this.registerForm.valid) {
            console.info(this.registerForm.getRawValue())
        }
    }

    /**
     * Gère l'état du control "Newsletter" en fonction de la checkbox
     * @private
     */
    private manageNewsletterState(): void {
        this.optionalForm.controls.newsletterSub.valueChanges.pipe(takeUntilDestroyed())
            .subscribe(() => {
                this.optionalForm.controls.newsletterFrequency.reset();
            }
        )
    }
}
