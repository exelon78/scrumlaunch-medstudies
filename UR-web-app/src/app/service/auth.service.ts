/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-prototype-builtins */
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {User} from '../entity/user';
import {EntityService} from './entity.service';
import {Router, ActivatedRoute} from '@angular/router';
import {AccessToken} from '../entity/access-token';
import {environment} from 'src/environments/environment';
import {UserService} from './user.service';
import {v4 as uuidv4} from 'uuid';
import getPkce from 'oauth-pkce';
import {Observable} from 'rxjs';
@Injectable({providedIn: 'root'})
export class AuthService {
  constructor(
    private readonly http: HttpClient,
    public cookieService: CookieService,
    public entityService: EntityService<AccessToken>,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private readonly userService: UserService,
  ) {}

  initSessionStorage(): void {
    sessionStorage.setItem('correlationId', uuidv4());

    //TODO(Prakash) uncomment getPkce method once https enabled in test enviornment

    // getPkce(43, (error, {verifier, challenge}) => {
    //   if (!error) {
    //     sessionStorage.setItem('pkceVerifier', verifier);
    //     sessionStorage.setItem('pkceChallenge', challenge);
    //   }
    // });

    //TODO(Prakash) remove hardcoded pkce values once https issue resolved in test enviornment

    sessionStorage.setItem(
      'pkceVerifier',
      'IIZLcGtmuoCgXhazHneHoXVMmPRM1tkjfUs2yJ4uXvv3nVswiv',
    );
    sessionStorage.setItem(
      'pkceChallenge',
      'wR4RMz7BGMNNXf6H9lWjV-2l8OiUQ47UOU8wHWOxVC4',
    );
  }

  beginLoginConsentFlow(): void {
    const params = new HttpParams()
      .set('client_id', environment.client_id)
      .set('scope', 'offline_access')
      .set('appId', environment.appId)
      .set('response_type', 'code')
      .set('mobilePlatform', environment.mobilePlatform)
      .set('code_challenge_method', 'S256')
      .set('code_challenge', sessionStorage.getItem('pkceChallenge') || '')
      .set('correlationId', sessionStorage.getItem('correlationId') || '')
      .set('tempRegId', sessionStorage.getItem('tempRegId') || '')
      .set('redirect_uri', environment.redirectUrl)
      .set('state', uuidv4())
      .set('env', 'localhost')
      .toString();
    window.location.href = `${environment.loginUrl}?${params}`;
  }

  hasCredentials(): boolean {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return sessionStorage.hasOwnProperty('accessToken') !== null;
  }

  getUserAccessToken(): string {
    return sessionStorage.getItem('accessToken') || '';
  }
  getAuthUserId(): string {
    return sessionStorage.getItem('authUserId') || '';
  }

  getToken(code: string, userId: string): Observable<AccessToken> {
    const httpOptionsforauth = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'correlationId': `${sessionStorage.getItem('correlationId') || ''}`,
        'appId': `${environment.appId}`,
        'mobilePlatform': `${environment.mobilePlatform}`,
      }),
    };
    const payLoad = new HttpParams()
      .set(`grant_type`, 'authorization_code')
      .set('scope', 'openid offline offline_access')
      .set('code', code)
      .set('redirect_uri', `${environment.redirectUrl}`)
      .set('userId', userId)
      .set('code_verifier', `${sessionStorage.getItem('pkceVerifier') || ''}`);
    return this.http.post<AccessToken>(
      `${environment.authServerUrl}/oauth2/token`,
      payLoad.toString(),
      httpOptionsforauth,
    );
  }

  getUserDetails(): void {
    this.userService.getUserDetails().subscribe((user: User) => {
      this.cookieService.set('user', JSON.stringify(user));
      void this.router.navigate(['/coordinator/']);
    });
  }

  logOutUser(): void {
    sessionStorage.clear();
    this.cookieService.deleteAll();
  }
}
