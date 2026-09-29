import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  if (token) {
    const copy = req.clone({ setHeaders: { 'Authorization': 'Bearer ' + token } });
    return next(copy).pipe(
      catchError(err => {
        if (err.status === 401) {
          localStorage.removeItem('token');
        }
        return throwError(() => err);
      }
      )
    );
  }
  return next(req);
};
