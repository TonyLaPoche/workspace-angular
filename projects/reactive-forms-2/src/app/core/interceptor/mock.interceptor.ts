import {HttpInterceptorFn, HttpResponse} from '@angular/common/http';
import mockData from '../../api/data/date-mock.json'
import {delay, of} from "rxjs";

export const mockInterceptor: HttpInterceptorFn = (req, next) => {

    if (req.url.includes('mock-user')) {
        return of(
            new HttpResponse({
                status: 200,
                body: mockData,
                headers: req.headers.set('Content-Type', 'application/json'),
            })
        ).pipe(
            delay(1500)
        )
    }
    return next(req);
};
