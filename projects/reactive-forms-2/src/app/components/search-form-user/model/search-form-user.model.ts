export interface HttpResponseUsers {
    data: UserForm[],
    params: Params
}

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

export interface SortParams {
    active: string | null,
    direction: string | null
}

export interface Params {
    filters: ParamsFilters | null,
    pagination: PaginationParams | null,
    sort: SortParams | null,
}

export interface UserForm {
    name: string,
    age: number,
    city: string,
    email: string,
    subscribe: string
}