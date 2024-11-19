import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-form-adresse',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  template: `
    <form [formGroup]="address()">
      <div class="mb-4">
        <label for="city" class="block text-sm font-medium text-gray-700">Ville</label>
        <input
            type="text"
            name="city"
            formControlName="city"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <div class="mb-4">
        <label for="state" class="block text-sm font-medium text-gray-700">État / Région</label>
        <input
            type="text"
            name="state"
            formControlName="state"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <div class="mb-4">
        <label for="zipcode" class="block text-sm font-medium text-gray-700">Code Postal</label>
        <input
            type="text"
            name="zipcode"
            formControlName="zipcode"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <div class="mb-4">
        <label for="country" class="block text-sm font-medium text-gray-700">Pays</label>
        <input
            type="text"
            name="country"
            formControlName="country"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

    </form>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormAdresseComponent {
  address = input.required<FormGroup>()
}
