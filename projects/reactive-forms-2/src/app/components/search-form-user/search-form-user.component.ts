import {ChangeDetectionStrategy, Component, inject, input, OnInit, output} from '@angular/core';
import {SearchFormUser} from "./model/search-form-user";
import {ReactiveFormsModule} from "@angular/forms";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatSlider, MatSliderRangeThumb} from "@angular/material/slider";
import {MatOption, MatSelect} from "@angular/material/select";
import {JsonPipe} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {FormUserService} from "./form-user.service";

@Component({
    selector: 'app-search-form-user',
    imports: [
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        MatInput,
        MatButton,
        MatSlider,
        MatSliderRangeThumb,
        MatSelect,
        MatOption,
        MatError,
        JsonPipe,
    ],
    template: `
        <form [formGroup]="userForm" autocomplete="off" (ngSubmit)="submitForm()" class="w-full space-y-4">
            <section class="flex items-center space-x-2">
                <div class="flex-1">
                    <mat-form-field class="w-full" appearance="fill">
                        <mat-label>Search</mat-label>
                        <input matInput placeholder="Ex. Chuck norris" name="name" id="name" formControlName="name">
                        @if (userForm.get('name')?.errors; as errorName) {
                            <mat-error>
                                {{ errorName | json }}
                            </mat-error>
                        }
                    </mat-form-field>
                </div>
                <button type="submit" mat-flat-button
                        class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                    Search
                </button>
            </section>

            <div class="grid grid-cols-2 gap-4">
                <section formGroupName="age" class="col-span-1 flex flex-col">
                    <mat-label>Age</mat-label>
                    <mat-slider min="18" max="100" showTickMarks discrete [displayWith]="formatLabel">
                        <input value="18" matSliderStartThumb formControlName="min">
                        <input value="100" matSliderEndThumb formControlName="max">
                    </mat-slider>
                </section>

                <section class="col-span-1">
                    <mat-form-field class="w-full">
                        <mat-label>Cities</mat-label>
                        <mat-select formControlName="cities" multiple>
                            @for (city of citiesDefault; track $index) {
                                <mat-option [value]="city">{{ city }}</mat-option>
                            }
                        </mat-select>
                    </mat-form-field>
                </section>
            </div>
        </form>

    `,
    styles: `
      :host {
        max-width: 800px;
      }`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchFormUserComponent implements OnInit {
    /** Form */
    readonly userForm = SearchFormUser.buildUSerForm();
    /** Sub Form Getter of userForm */
    readonly ageForm = this.userForm.controls.age;

    citiesDefault = ["Paris", "Lyon", "Bordeaux"];

    formOutput = output<any>()
    paramsInput = input<string>('');

    private readonly router = inject(Router);
    private readonly route = inject(ActivatedRoute);
    private readonly formService = inject(FormUserService);

    ngOnInit() {
        this.route.queryParamMap.subscribe(params => {
            const search = params.get('search') ?? '';
            const minAge = params.get('minAge') ?? '18';
            const maxAge = params.get('maxAge') ?? '100';
            const cities = params.getAll('cities');

            this.userForm.patchValue({
                name: search,
                age: {
                    min: parseInt(minAge),
                    max: parseInt(maxAge)
                },
                cities
            });
        });
    }

    formatLabel(value: number): string {
        return `${value}`;
    }

    submitForm(): void {
        const formValues = this.userForm.getRawValue();

        const queryParams = {
            search: formValues.name,
            minAge: formValues.age.min,
            maxAge: formValues.age.max,
            cities: formValues.cities
        };

        this.router.navigate(['.'], {
            queryParams,
            queryParamsHandling: 'merge'
        });
    }
}
