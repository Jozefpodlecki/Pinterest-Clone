import UserService from '.';
import { Observable, from, Subject, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericCredentials } from '../models/GenericCredentials';
import { BaseEnvironment } from 'src/environments/BaseEnvironment';
import { Profile } from '../models/profile';
import { Injectable } from '@angular/core';

@Injectable() 
export class HttpUserService implements UserService {

  token: string;
  baseUrl: string;
  isLoggedIn: BehaviorSubject<boolean>;

  localStorageKey = "token";

  clearTokenFromLocalStorage = () => {
    return localStorage.removeItem(this.localStorageKey);
  }

  getTokenFromLocalStorage = () => {
    return localStorage.getItem(this.localStorageKey);
  }

  setTokenToLocalStorage = (token: string) => {
    localStorage.setItem(this.localStorageKey, token);
  }
  
  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _route: ActivatedRoute,
    private _environment: BaseEnvironment
    ) {
    this.baseUrl = this._environment.baseUrl;
    this.token = this.getTokenFromLocalStorage();
    this.isLoggedIn = this.checkIfLoggedIn();
    
    this._route.queryParams.subscribe(({token}) => {
      if(token) {
        this.setTokenToLocalStorage(token);
        this._router.navigate(['/']);
      }
    })
  }

  clearToken() {
    this.clearTokenFromLocalStorage();
  }

  getToken() {
    return this.token;
  }

  checkIfLoggedIn() {
    let value = false;

    if(this.token) {
      value = true;
    }

    return new BehaviorSubject(value);
  }
  
  signOut() {
    this.clearTokenFromLocalStorage();
    this.token = null;
    this.isLoggedIn.next(false);
  }

  login(credentials: GenericCredentials) {

      return this._http.post<string>(`${this.baseUrl}api/account/login`, credentials, {
        responseType: <any>'text'
      })
        .pipe(
          tap(token => {
            this.setTokenToLocalStorage(token);
            this.token = token;
            this.isLoggedIn.next(true);
          })
        )
  }

  getUserImages() {
    return this._http.get<any>(`${this.baseUrl}api/image/user`)
  }

  getProfile() {
    return this._http.get<Profile>(`${this.baseUrl}api/account/user`)
  }
}
