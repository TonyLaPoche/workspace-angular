import {ChangeDetectionStrategy, Component} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {SearchFormUserComponent} from "./components/search-form-user/search-form-user.component";
import {UsersComponent} from "./components/users/users.component";
import {BehaviorSubject} from "rxjs";

@Component({
    selector: 'app-root',
    imports: [AsyncPipe, SearchFormUserComponent, UsersComponent],
    template: `
        <h1 class=" text-2xl text-red-800">
            {{ title }}
        </h1>
        <app-search-form-user (formOutput)="search$.next($event)"/>
        <app-users/>
    `,
    styles: `
      :host {
        max-width: 800px;
        background-color: red;
      }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
    title = 'reactive-forms-2';
    search$ = new BehaviorSubject<any>('');
}
