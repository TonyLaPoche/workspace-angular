import { Injectable } from '@angular/core';
import {delay, of, take} from "rxjs";
import {AbstractControl} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class FormUserService {

  checkBirthDateValidity(control: AbstractControl) {
    const currentDate = new Date();
    const inputDate = new Date(control.value);

    const currentYears = currentDate.getFullYear();
    const currentMonths = currentDate.getMonth();
    const currentDay = currentDate.getDate();

    const inputDateYears = inputDate.getFullYear();
    const inputDateMonths = inputDate.getMonth();
    const inputDateDay = inputDate.getDate();

    const age = currentYears - inputDateYears;
    const hasHadBirthdayThisYear =
        currentMonths > inputDateMonths ||
        (currentMonths === inputDateMonths && currentDay >= inputDateDay);

    if (age < 18 || (age === 18 && hasHadBirthdayThisYear)) {
      return of({ birthDate: '18 ans révolue exigé' }).pipe(
          take(1),
          delay(1000))
    }

    if (control.value.toISOString() < currentDate.toISOString()) {
        return of(null).pipe(
            take(1),
            delay(1000)
        )
    }
     else {
      return of({ birthDate: 'Birth date invalid' }).pipe(
          take(1),
          delay(1000)

      )
    }
  }



}
