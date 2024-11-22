import {User} from "./user.model";
import {Address} from "./adresse.model";

export interface UserForm {
    user: User,
    address: Address,
    optional: Preference
}

interface Preference {
    newsletterSubscription: boolean,
    newsletterFrequency: string | null,
    hobbies: string[] | null,
    website: string | null,
    commentary: string | null
}


