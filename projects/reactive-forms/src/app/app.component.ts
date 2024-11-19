import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FormGroupComponent} from "./components/form-groupe/form-group.component";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, FormGroupComponent],
    template: `
        <h1 class="text-2xl text-center">Reactive Forms</h1>
        <app-form-groupe/>
    `,
    styles: ``,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
    title = 'reactive-forms';
}
