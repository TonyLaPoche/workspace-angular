import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {
    MatCell, MatCellDef,
    MatColumnDef,
    MatHeaderCell, MatHeaderCellDef,
    MatHeaderRow, MatHeaderRowDef,
    MatNoDataRow,
    MatRow, MatRowDef,
    MatTable
} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort, MatSortHeader, Sort} from "@angular/material/sort";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormUserService} from "../search-form-user/form-user.service";
import {rxResource, toObservable, toSignal} from "@angular/core/rxjs-interop";
import {HttpResponseUsers, UserForm} from "../search-form-user/model/search-form-user.model";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {NgPlural} from "@angular/common";
import {of} from "rxjs";
import {data} from "autoprefixer";

@Component({
    selector: 'app-users',
    imports: [
        MatTable,
        MatColumnDef,
        MatHeaderCell,
        MatCell,
        MatPaginator,
        MatHeaderRow,
        MatRow,
        MatNoDataRow,
        MatSort,
        MatSortHeader,
        MatProgressSpinner,
        MatHeaderCellDef,
        MatCellDef,
        MatHeaderRowDef,
        MatRowDef,
        NgPlural,

    ],
    templateUrl: './users.component.html',
    styles: ``,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent {

    route = inject(ActivatedRoute);
    router = inject(Router);
    formUserService = inject(FormUserService)
    params = toSignal(this.route.queryParams, {initialValue: {}})
    displayedColumns = ["name", "age", "city", "email", "subscribe"];


    usersHttpsResponse = rxResource<HttpResponseUsers | undefined, Params>({
        request: () => this.params(),
        loader: ({request: params}) => {
            return this.formUserService.getMockUsersWithParams(params)
        }
    })


    paginationEvent(filter: PageEvent) {
        this.router.navigate(['.'], {queryParams: filter, queryParamsHandling: 'merge'});
    }


    // TODO fixbug
    sortBy({direction, active}: Sort) {
        if (this.usersHttpsResponse.hasValue()) {
            this.usersHttpsResponse.value.update((value) => {
                const arraySorted = value?.data.sort((a,b) => {
                    const isAsc = direction === 'asc'
                    switch (active) {
                        case 'name' :
                            return compare(a.name, b.name, isAsc);
                    }
                })
                return { data: arraySorted, pagination: value?.pagination}
            })
        }

        function compare(a: number | string, b: number | string, isAsc: boolean) {
            return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
        }

    }


    protected readonly Number = Number;
}