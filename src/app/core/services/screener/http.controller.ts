import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export class HttpController {
    public apiUrl = environment.truchartsAPI;
    constructor(public httpClient: HttpClient) { }

    sendRequest<T>(method: string, url: string, data?: {}): Observable<T> {
        let headers: HttpHeaders = new HttpHeaders();
        const token = localStorage.getItem('app_access_token');
        if (token) {
            headers = headers.set('Authorization', `Bearer ${token}`);
        }

        return this.httpClient.request<T>(method, url, {body: data, headers})
            .pipe(catchError((error: Response) =>
                throwError(error)
            ));
    }
}
