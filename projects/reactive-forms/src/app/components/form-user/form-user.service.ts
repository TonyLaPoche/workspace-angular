import { Injectable } from '@angular/core';
import {delay, of, take} from "rxjs";
import {AbstractControl} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class FormUserService {

  checkBirthDateValidity(control: AbstractControl) {
    const today = new Date()
    if (control.value.toISOString() < today.toISOString()) {
      console.log(control.value.toISOString())
      console.log('---')
      console.log(today.toISOString())

        return of(null).pipe(
            take(1),
            delay(5000)
        )
    } else {
      return of({ birthDate: true }).pipe(
          take(1),
          delay(5000)

      )
    }
  }



}
