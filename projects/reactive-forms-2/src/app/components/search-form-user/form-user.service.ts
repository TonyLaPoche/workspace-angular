import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {UserForm} from "./model/search-form-user.model";
import {Params} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class FormUserService {
    http = inject(HttpClient)

    Users$ = new BehaviorSubject('')

    getMockUsers(): Observable<UserForm[]> {
        return this.http.get<UserForm[]>('mock-user')
    }

    getMockUsersWithParams(paramsValue: Params): Observable<UserForm[]> {
        return this.http.get<UserForm[]>('mock-user', {params: paramsValue})
    }
}
