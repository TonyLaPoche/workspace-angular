import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-form-user',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  template: `
      <form [formGroup]="userGrp()">
          <div class="mb-4">
              <label for="name" class="block text-sm font-medium text-gray-700">Nom</label>
              <input
                      type="text"
                      name="name"
                      id="name"
                      formControlName="name"
                      class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
          </div>
          <div class="mb-4">
              <label for="lastName" class="block text-sm font-medium text-gray-700">Prénom</label>
              <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      formControlName="lastName"
                      class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
          </div>
          <div class="mb-4">
              <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
              <input
                      type="email"
                      name="email"
                      id="email"
                      formControlName="email"
                      class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
          </div>
      </form>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormUserComponent {
  userGrp = input.required<FormGroup>()
}
