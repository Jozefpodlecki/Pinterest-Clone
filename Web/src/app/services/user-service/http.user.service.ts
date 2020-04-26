import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseEnvironment } from "@environments/BaseEnvironment";
import { GenericCredentials } from "@models/GenericCredentials";
import { Profile } from "@models/profile";
import { UpdateProfile } from "@models/UpdateProfile";
import { AuthContextService } from "@services/auth-context/auth-context.service";
import { BehaviorSubject, from, Observable, of, Subject } from "rxjs";
import { tap } from "rxjs/operators";
import UserService from ".";

@Injectable()
export class HttpUserService implements UserService {
    private token: string;
    private baseUrl: string;
    profile: Profile;

    private localStorageKey = "token";

    clearTokenFromLocalStorage = () => {
        return localStorage.removeItem(this.localStorageKey);
    };

    getTokenFromLocalStorage = () => {
        return localStorage.getItem(this.localStorageKey);
    };

    setTokenToLocalStorage = (token: string) => {
        localStorage.setItem(this.localStorageKey, token);
    };

    constructor(
        private _http: HttpClient,
        private _router: Router,
        private _route: ActivatedRoute,
        private _environment: BaseEnvironment,
        private _authContextService: AuthContextService
    ) {
        this.baseUrl = this._environment.baseUrl;
        this.token = this.getTokenFromLocalStorage();
        this.profile = null;

        this._route.queryParams.subscribe(({ token }) => {
            if (token) {
                this.setTokenToLocalStorage(token);
                this._router.navigate(["/"]);
            }
        });

        this._authContextService.isLoggedIn.subscribe((value) => {
            if (value) {
                this.getProfile().subscribe((profile) => {
                    this.profile = profile;
                });
            }
        });
    }

    clearToken() {
        this.clearTokenFromLocalStorage();
    }

    getToken() {
        return this.token;
    }

    checkIfLoggedIn() {
        let value = false;

        if (this.token) {
            value = true;
        }

        return new BehaviorSubject(value);
    }

    signOut() {
        this.clearTokenFromLocalStorage();
        this.token = null;
        this._authContextService.isLoggedIn.next(false);
    }

    login(credentials: GenericCredentials) {
        return this._http
            .post<string>(`${this.baseUrl}api/account/login`, credentials, {
                responseType: "text" as any,
            })
            .pipe(
                tap((token) => {
                    this.setTokenToLocalStorage(token);
                    this.token = token;
                    this._authContextService.isLoggedIn.next(true);
                })
            );
    }

    getUserImages() {
        return this._http.get<any>(`${this.baseUrl}api/image/user`);
    }

    updateProfile(data: UpdateProfile): Observable<any> {
        return of(null);
    }

    getProfile() {
        if (this.profile) {
            return of(this.profile);
        }

        return this._http.get<Profile>(`${this.baseUrl}api/account/user`);
    }
}
