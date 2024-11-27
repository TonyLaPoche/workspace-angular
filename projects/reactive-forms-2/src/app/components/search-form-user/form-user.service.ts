import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {HttpResponseUsers} from "./model/search-form-user.model";
import {Params} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class FormUserService {
    http = inject(HttpClient)

    getMockUsersWithParams(params: Params): Observable<HttpResponseUsers> {
        return this.http.get<HttpResponseUsers>('mock-user', {params})
    }
}
