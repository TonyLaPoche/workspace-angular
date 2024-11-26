import {ApplicationConfig} from '@angular/core';
import {provideRouter} from "@angular/router";
import {routes} from "../../../reactive-forms/src/app/app.routes";
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {mockInterceptor} from "./core/interceptor/mock.interceptor";

export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes), provideAnimationsAsync(), provideHttpClient(withInterceptors([mockInterceptor]))]
};
