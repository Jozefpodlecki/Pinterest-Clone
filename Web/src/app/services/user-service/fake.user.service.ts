import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import UserService from '.'
import { Observable, from, Subject, BehaviorSubject, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GenericCredentials } from '@models/GenericCredentials';
import { BaseEnvironment } from '@environments/BaseEnvironment';
import { Profile } from '@models/profile';
import { AuthContextService } from '@services/auth-context/auth-context.service';
import { UpdateProfile } from '@models/UpdateProfile';

const userImages = [
    [
      {
        id: 1,
        title: '',
        description: '',
        link: '',
        category: ''
      },
      {
        id: 2,
        title: '',
        description: '',
        link: '',
        category: ''
      }
    ]
  ]
  
  const profile = {
    id: 1,
    displayName: "Jozef",
    email: 'jozef.witold.podlecki@gmail',
    aboutMe: null,
    background: 'https://wallpaperaccess.com/full/430453.jpg',
    avatar: "https://avatars0.githubusercontent.com/u/36174963?s=460&u=c90d32e1cc29330794c959948027f1e6c2125e7f&v=4",
    isAdmin: false
  }

@Injectable() 
export class FakeUserService implements UserService {

  private token: string;
  private profile: Profile;

  constructor(
    private _authContextService: AuthContextService
  ) {
    this.token = '';
  }

  signOut(): void {
    this._authContextService.isLoggedIn.next(false);
    this.token = '';  
  }

  login(credentials: GenericCredentials): Observable<any> {
    this._authContextService.isLoggedIn.next(true);
    this.token = '1';
    return of(null);
  }
  
  clearToken(): void {
    this.token = '';
  }

  getToken(): string {
    return this.token;
  }
  
  getUserImages(): Observable<any> {
    return of([]);
  }

  updateProfile(data: UpdateProfile): Observable<any> {
    return of(null);
  }
  
  getProfile(): Observable<Profile> {
    this.profile = profile;
    return of(this.profile);
  }

}