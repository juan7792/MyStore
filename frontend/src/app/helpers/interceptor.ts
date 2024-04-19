import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable()

export class interceptorFactory implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const { url, method, headers, body } = request;
        let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlRlc3QgVXNlciAxIiwiaWQiOjN9.N7ni3xs-tck0JzzcVwW4BEgHSkmQgaxHlHN7NB4R67c';
        let token1 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlRlc3QgVXNlciAxIiwiaWQiOjF9.ixz0QjsD2CmtyOfh4pEu4q5zbWI3rWgF2b783elSc-8';
        let token2 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlRlc3QgVXNlciAyIiwiaWQiOjJ9.JTVghRz1IZ_B_l5Ji8p5rYCVeGhLn2nM2mhik5pxIs0';
        let token3 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlRlc3QgVXNlciAzIiwiaWQiOjN9.YTeXf238jJtRvKHfPX6tqJv3Cet2BlX8a2o2WgYDZi8';

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