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