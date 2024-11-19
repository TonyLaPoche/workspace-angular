import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FormGroupComponent} from "./components/form-groupe/form-group.component";
import {MatSlideToggle} from "@angular/material/slide-toggle";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, FormGroupComponent, MatSlideToggle],
    template: `
        <h1 class="text-2xl text-center">Reactive Forms</h1>
        <app-form-group/>
        <mat-slide-toggle>Toggle me!</mat-slide-toggle>
    `,
    styles: ``,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
    title = 'reactive-forms';
}
