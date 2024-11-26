import {ChangeDetectionStrategy, Component, Directive, inject, output} from '@angular/core';
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatNoDataRow,
    MatRow,
    MatRowDef,
    MatTable
} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort, MatSortHeader, Sort, SortDirection} from "@angular/material/sort";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormUserService} from "../search-form-user/form-user.service";
import {AsyncPipe, JsonPipe} from "@angular/common";
import {rxResource, toSignal} from "@angular/core/rxjs-interop";
import {UserForm} from "../search-form-user/model/search-form-user.model";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";
import {MatSortHarness} from "@angular/material/sort/testing";

@Component({
    selector: 'app-users',
    imports: [
        MatTable,
        MatColumnDef,
        MatHeaderCell,
        MatCell,
        MatHeaderCellDef,
        MatCellDef,
        MatPaginator,
        MatHeaderRowDef,
        MatRowDef,
        MatHeaderRow,
        MatRow,
        MatNoDataRow,
        MatSort,
        MatSortHeader,
        AsyncPipe,
        JsonPipe,
        MatProgressSpinner,
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


    users = rxResource<UserForm[] | undefined, Params>({
        request: () => this.params(),
        loader: ({request: params}) => {
            return this.formUserService.getMockUsersWithParams(params)
        }
    })


    sortAndPaginationEvent(filter?: PageEvent | Sort) {
       if (filter instanceof PageEvent) {
           this.router.navigate(['.'], { queryParams: { pageIndex: filter.pageIndex }, queryParamsHandling: 'merge'});
        } else {
           console.log(filter)
           this.router.navigate(['.'], { queryParams: { column: filter?.active, sort: filter?.direction }, queryParamsHandling: 'merge'});
        }
    }

}