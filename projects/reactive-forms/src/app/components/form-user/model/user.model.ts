export interface User {
    name: string,
    lastname: string,
    email: string,
    age: number,
    birthDate: Date,
    gender: Gender,
    phoneNumber: string,
    password: string,
}

enum Gender {
    man = 'Men',
    women = 'Women',
    other = 'Other'
}