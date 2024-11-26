import {ChangeDetectionStrategy, Component, effect, inject, input} from '@angular/core';
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
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {ActivatedRoute, Params} from "@angular/router";
import {map, switchMap, tap} from "rxjs";
import {FormUserService} from "../search-form-user/form-user.service";
import {AsyncPipe, JsonPipe} from "@angular/common";

interface QueryParams {
    name: string | undefined
    age: string | undefined
    cities: string[] | undefined
}

@Component({
    selector: 'app-users',
    standalone: true,
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
        JsonPipe
    ],
    templateUrl: './users.component.html',
    styles: ``,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent {

    route = inject(ActivatedRoute)
    formUSerServices = inject(FormUserService)

    search = input<string>('')
    age = input<string>('')
    cities = input<string[]>([])

    // users$ = this.route.queryParams.pipe(
    //     map((params) => this.paramsToFilter(params)),
    //     tap(filtered => console.info(filtered))
    // );

    constructor() {
        effect(() => {
            console.log(this.cities())
        });
    }

    paramsToFilter(params: Params) {
        return {
            name: params['search'],
            age: params['age'],
            cities: params['cities']
        }
    }
}
