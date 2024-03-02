import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { catchError, switchMap, throwError } from 'rxjs';
import { TokenService } from '../services/token.service';
import { inject } from '@angular/core';

export const tokenInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const accessToken = localStorage.getItem('accessToken');
  const tokenService = inject(TokenService);

  if (accessToken && req.url.includes('add')) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return next(clonedReq).pipe(
      catchError((errorData) => {
        if (errorData.status == 401) {
          return tokenService.getRefreshToken().pipe(
            switchMap((refreshResult) => {
              localStorage.setItem('accessToken', refreshResult.accessToken);
              return next(
                req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${refreshResult.accessToken}`,
                  },
                })
              );
            })
          );
        }
        return throwError(() => errorData);
      })
    );
  }

  return next(req);
};
