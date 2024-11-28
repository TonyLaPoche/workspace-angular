import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatTableModule} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSortModule, Sort} from "@angular/material/sort";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormUserService} from "../search-form-user/form-user.service";
import {rxResource, toSignal} from "@angular/core/rxjs-interop";
import {HttpResponseUsers, UserForm} from "../search-form-user/model/search-form-user.model";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {I18nPluralPipe} from "@angular/common";

@Component({
    selector: 'app-users',
    imports: [
        MatPaginator,
        MatProgressSpinner,
        I18nPluralPipe,
        MatTableModule,
        MatSortModule
    ],
    templateUrl: './users.component.html',
    styles: ``,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent {
    protected readonly Number = Number;
    route = inject(ActivatedRoute);
    router = inject(Router);
    formUserService = inject(FormUserService)
    params = toSignal(this.route.queryParams, {initialValue: {}})
    displayedColumns = ["name", "age", "city", "email", "subscribe"];
    usersPlural = {
        "=0": "Auncun utilisateur",
        "=1": "Un utilisateur",
        "other": "# utilisateurs"
    }

    usersHttpsResponse = rxResource<HttpResponseUsers | undefined, Params>({
        request: () => this.params(),
        loader: ({request: params}) => {
            return this.formUserService.getMockUsersWithParams(params);
        }
    })


    paginationEvent(filter: PageEvent) {
        this.router.navigate(['.'], {queryParams: filter, queryParamsHandling: 'merge'});
    }

    sortBy({direction, active}: Sort) {
        this.usersHttpsResponse.update(value => {
            if (!value) {
                console.warn(value, 'Les valeurs ne sont pas encore définie')
                return
            }
            let newArray = value.data
            const isAsc = direction === 'asc'
            newArray.sort((a, b) => compare(a[active as keyof UserForm], b[active as keyof UserForm], isAsc)
            )
            return {...value, data: [...newArray]}
        })

        this.router.navigate(['.'], {queryParams: {direction, active}});

        function compare(a: number | string, b: number | string, isAsc: boolean) {
            return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
        }

    }
}