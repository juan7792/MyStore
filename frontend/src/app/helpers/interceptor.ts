import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable()

export class interceptorFactory implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const { url, method, headers, body } = request;
        let token1 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlRlc3QgVXNlciAxIiwiaWQiOjF9.ixz0QjsD2CmtyOfh4pEu4q5zbWI3rWgF2b783elSc-8';
        let token2 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlRlc3QgVXNlciAyIiwiaWQiOjJ9.JTVghRz1IZ_B_l5Ji8p5rYCVeGhLn2nM2mhik5pxIs0';
        let token3 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlRlc3QgVXNlciAzIiwiaWQiOjN9.YTeXf238jJtRvKHfPX6tqJv3Cet2BlX8a2o2WgYDZi8';

        if (url.endsWith('/api/authenticate') && method === 'POST'){
            return authenticate();
        }
        else
            return next.handle(request);

        function authenticate() {
            const { email, password } = JSON.parse(body);

            if (email === 'test1' && password === '1234'){
                return of(new HttpResponse({
                status: 200,
                body: { token: token1 }
                }))
            } else if (email === 'test2' && password === '1234'){
                return of(new HttpResponse({
                    status: 200,
                    body: { token: token2 }
                    }))
            } else if (email === 'test3' && password === '1234'){
                return of(new HttpResponse({
                    status: 200,
                    body: { token: token3 }
                    }))
            }
            else
                return of(new HttpResponse({ status: 400 }))
        }   
    }
}