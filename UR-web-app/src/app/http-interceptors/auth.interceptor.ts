import {Injectable} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import {finalize} from 'rxjs/operators';
import {User} from '../entity/user';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {of} from 'rxjs';
import {Error} from 'src/app/entity/error.model';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private readonly spinner: NgxSpinnerService,
    private readonly toasterService: ToastrService,
  ) {}

  getUserDetails(): User | null {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser === null) {
      return null;
    }
    return JSON.parse(currentUser) as User;
  }
  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    void this.spinner.show();
    const user = this.getUserDetails();
    if (user === null) {
      return next.handle(req).pipe(
        catchError((err) => {
          this.handleError(err);
          return of(err);
        }),
        finalize(() => {
          void this.spinner.hide();
        }),
      );
    }
    const headers = req.headers
      .set('Content-Type', 'application/json')
      .set('userId', user.id.toString())
      .set('authToken', user.authToken)
      .set('authUserId', user.urAdminAuthId);
    const authReq = req.clone({headers});
    return next.handle(authReq).pipe(
      catchError((err) => {
        this.handleError(err);
        return of(err);
      }),
      finalize(() => {
        void this.spinner.hide();
      }),
    );
  }

  handleError(err: unknown): void {
    if (err instanceof HttpErrorResponse) {
      try {
        if (err.error instanceof ErrorEvent) {
          this.toasterService.error(err.error.message);
        } else {
          const customError = err.error as Error;
          if (customError.userMessage) {
            this.toasterService.error(customError.userMessage);
          } else {
            this.toasterService.error(
              `Error Code: ${err.status}\nMessage: ${err.message}`,
            );
          }
        }
      } catch (e) {
        this.toasterService.error('An error occurred', '');
      }
    } else {
      this.toasterService.error('An error occurred');
    }
  }
}
