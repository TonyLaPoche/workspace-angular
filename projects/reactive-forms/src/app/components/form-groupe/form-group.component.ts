import { ChangeDetectionStrategy, Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {FormAdresseComponent} from "./form-adresse/form-adresse.component";
import {FormUserComponent} from "./form-user/form-user.component";

@Component({
  selector: 'app-form-groupe',
  standalone: true,
    imports: [
        ReactiveFormsModule,
        FormAdresseComponent,
        FormUserComponent
    ],
  templateUrl: 'form-group.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormGroupComponent {
  authenticate = new FormGroup(
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
    console.info(this.authenticate.value)
  }
}
