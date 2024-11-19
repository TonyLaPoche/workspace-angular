import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FormUser} from "./components/form-user/form-user.component";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, FormUser],
    template: `
        <h1 class="text-2xl text-center">Reactive Forms</h1>
        <app-form-user/>
    `,
    styles: ``,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
    title = 'reactive-forms';
}
