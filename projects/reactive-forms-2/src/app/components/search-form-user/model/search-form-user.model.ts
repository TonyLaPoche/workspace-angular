export interface HttpResponseUsers {
    data: UserForm[]
    pagination: Pagination
}

export interface Pagination {
    previousPageIndex: string | null,
    pageIndex: string | null,
    pageSize: string | null
    length: string | null
}

export interface UserForm {
    name: string,
    age: number,
    city: string,
    email: string,
    subscribe: string
}

export interface UserParams {
    name: string,
    minAge: number,
    maxAge: number,
    city: string[],
}