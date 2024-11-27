import {HttpInterceptorFn, HttpParams, HttpResponse} from '@angular/common/http';
import mockData from '../../api/data/date-mock.json'
import {delay, of} from "rxjs";
import {UserForm} from "../../components/search-form-user/model/search-form-user.model";

export interface ParamsFilters {
    name: string,
    maxAge: string,
    minAge: string,
    cities: string[],
}

export interface PaginationParams {
    previousPageIndex: number | null,
    pageIndex: number | null,
    pageSize: number | null,
    length: number | null,
}

export interface HttpResponseUserFormWithPaginate {
    data: UserForm[]
    pagination: PaginationParams
}

export const mockInterceptor: HttpInterceptorFn = (req, next) => {
    if (req.url.includes('mock-user')) {
        return of(
            new HttpResponse({
                status: 200,
                body: filterWithParams(req.params),
                headers: req.headers.set('Content-Type', 'application/json'),
            })
        ).pipe(
            delay(1500)
        )
    }
    return next(req);
};

function filterWithParams(params: HttpParams) {
    const mockUsers: UserForm[] = mockData;

    const filtersParams: ParamsFilters = {
        name: params.get('search') ?? '',
        maxAge: params.get('maxAge') ?? '100',
        minAge: params.get('minAge') ?? '18',
        cities: params.getAll('cities') ?? []
    }


    const paginationParams: PaginationParams = {
        previousPageIndex: Number(params.get('previousPageIndex')),
        pageIndex: Number(params.get('pageIndex')),
        pageSize: Number(params.get('pageSize')),
        length: Number(params.get('length')),
    }

    const arrayFiltered = filtersParams.name ? arrayFilter(mockUsers, filtersParams) : mockUsers
    return paginate(paginationParams.pageSize, paginationParams.pageIndex, arrayFiltered)
}

function arrayFilter(array: UserForm[], params: ParamsFilters): UserForm[] {
    return array.filter((user) =>
        searchByName(user.name, params.name) &&
        ageValidity(user.age, Number(params.minAge), Number(params.maxAge)) &&
        (params.cities.length ? params.cities?.includes(user.city) : true )
    )

}

function ageValidity(age: number, minAge: number, maxAge: number): boolean {
    return age >= minAge && age <= maxAge
}


function searchByName(fullName: string, search: string): boolean {
    if (!search) {
        return true
    }
    const fullNameRef = fullName.trim().toLowerCase();
    const searchNameRef = search.trim().toLowerCase();
    return fullNameRef.includes(searchNameRef);
}

function paginate(pageSize: number | null, pageIndex: number | null, array: UserForm[]): HttpResponseUserFormWithPaginate {
    const totalItems = array.length;
    const arrayPaginated = array.slice(0, 20)
    if (!pageSize || !pageIndex) {
        return {
            data: arrayPaginated, pagination: {
                previousPageIndex: null,
                pageIndex: 0,
                pageSize: 20,
                length: totalItems
            }
        }
    }

    const startIndex = (pageIndex) * pageSize;
    console.log(startIndex)
    const endIndex = Math.min(startIndex + pageSize, totalItems)
    console.log(endIndex)
    return {
        data: array.slice(startIndex, endIndex),
        pagination: {
            previousPageIndex: pageIndex ? pageIndex - 1 : 0,
            pageIndex,
            pageSize,
            length: totalItems
        }
    }
}