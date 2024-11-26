import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormUser} from "./components/form-user/form-user.component";

@Component({
    selector: 'app-root',
    imports: [FormUser],
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
