import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [],
  template: `
    <div class="max-w-4xl mx-auto p-6 space-y-6">
      <!-- Card for Authentication Details -->
      <div class="bg-white shadow-md rounded-lg p-6">
        <h2 class="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">Informations renseigner</h2>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <span class="block text-sm font-medium text-gray-600">Nom :</span>
            <p class="text-gray-900 font-medium">{{ authenticate.get('name')?.value }}</p>
          </div>
          <div>
            <span class="block text-sm font-medium text-gray-600">Prénom :</span>
            <p class="text-gray-900 font-medium">{{ authenticate.get('lastName')?.value }}</p>
          </div>
          <div class="col-span-2">
            <span class="block text-sm font-medium text-gray-600">Email :</span>
            <p class="text-gray-900 font-medium">{{ authenticate.get('email')?.value }}</p>
          </div>
        </div>
      </div>

      <!-- Card for Address Details -->
      <div class="bg-white shadow-md rounded-lg p-6">
        <h2 class="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">Adresse</h2>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <span class="block text-sm font-medium text-gray-600">Ville :</span>
            <p class="text-gray-900 font-medium">{{ address.get('city')?.value }}</p>
          </div>
          <div>
            <span class="block text-sm font-medium text-gray-600">État / Région :</span>
            <p class="text-gray-900 font-medium">{{ address.get('state')?.value }}</p>
          </div>
          <div>
            <span class="block text-sm font-medium text-gray-600">Code Postal :</span>
            <p class="text-gray-900 font-medium">{{ address.get('zipcode')?.value }}</p>
          </div>
          <div>
            <span class="block text-sm font-medium text-gray-600">Pays :</span>
            <p class="text-gray-900 font-medium">{{ address.get('country')?.value }}</p>
          </div>
        </div>
      </div>
    </div>

  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultComponent {

}
