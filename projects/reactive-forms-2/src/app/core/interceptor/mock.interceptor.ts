import {HttpInterceptorFn, HttpParams, HttpResponse} from '@angular/common/http';
import mockData from '../../api/data/date-mock.json'
import {delay, of} from "rxjs";
import {UserForm} from "../../components/search-form-user/model/search-form-user.model";

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

    const maxAge = params.get('maxAge')
    const minAge = params.get('minAge')
    const name = params.get('search')
    const cities = params.getAll('cities')

    return mockUsers.filter((user) => {
        return searchByName(user.name, name) && ageValidity(user.age, Number(minAge), Number(maxAge)) && (cities ? cities.includes(user.city) : true)
    })
}

function ageValidity(age: number, minAge: number, maxAge: number): boolean {
    return age >= minAge && age <= maxAge
}


function searchByName(fullName: string, search: string | null): boolean {
    if (!search) {
        return true
    }
    const fullNameRef = fullName.trim().toLowerCase();
    const searchNameRef = search.trim().toLowerCase();
    return fullNameRef.includes(searchNameRef);
}