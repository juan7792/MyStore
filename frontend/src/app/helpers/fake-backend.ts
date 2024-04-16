import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable()

export class fakeBackendFactory implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const { url, method, headers, body } = request;
        let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlRlc3QgMSIsImlhdCI6MTUxNjIzOTAyMiwiYWRtaW4iOnRydWV9.Lokoj2-PLZoqkMH1JA6WkqV0P7QqtD6oVQTy_Gp_tcU';

        if (url.endsWith('/api/authenticate') && method === 'POST'){
            return authenticate();
        }
        else if (url.endsWith('/api/orders') && method === 'GET')
            return getOrders();
        else
            return next.handle(request);

        function authenticate() {
            const { email, password } = JSON.parse(body);

            if (email === 'test' && password === '1234')
                return of(new HttpResponse({
                status: 200,
                body: { token: token }
                }))
            else
                return of(new HttpResponse({ status: 400 }))
        }    
            
        function getOrders() {
            if (request.headers.get('Authorization') === 'Bearer ' + token)
                return of(new HttpResponse({
                    status: 200,
                    body: [1, 2, 3]
                }))
            else
                return of(new HttpResponse({ status: 401 }))
        }

    }
}