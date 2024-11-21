export interface UserForm {
    user: User,
    address: Address,
    optional: Preference
}

interface User {
    name: string,
    lastname: string,
    email: string,
    age: number,
    birthDate: Date,
    gender: Gender,
    phoneNumber: string,
    password: string,
}

interface Address {
    street: string,
    city: string,
    zipCode: number,
}

interface Preference {
    newsletterSubscription: boolean,
    newsletterFrequency: string | null,
    hobbies: string[] | null,
    website: string | null,
    commentary: string | null
}

enum Gender {
    man = 'Men',
    women = 'Women',
    other = 'Other'
}