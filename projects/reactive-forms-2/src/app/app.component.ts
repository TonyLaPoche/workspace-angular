import {ChangeDetectionStrategy, Component} from '@angular/core';
import {SearchFormUserComponent} from "./components/search-form-user/search-form-user.component";
import {UsersComponent} from "./components/users/users.component";
import {MatAnchor} from "@angular/material/button";
import {RouterLink} from "@angular/router";

@Component({
    selector: 'app-root',
    imports: [SearchFormUserComponent, UsersComponent, RouterLink, MatAnchor],
    template: `
        <h1 class="text-center my-3 text-2xl text-red-800">
            {{ title }}
        </h1>
        <a mat-button routerLink="/">Home</a>
        <app-search-form-user/>
        <app-users/>
    `,
    styles: ``,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
    title = 'reactive-forms-2';
}
