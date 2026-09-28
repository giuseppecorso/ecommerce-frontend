import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  if (token){
    const copy = req.clone({ setHeaders: { 'Authorization': 'Bearer ' + token } });
    return next(copy);
  }
  return next(req);
};
