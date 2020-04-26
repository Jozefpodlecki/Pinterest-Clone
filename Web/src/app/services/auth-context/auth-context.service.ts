import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthContextService {

  isLoggedIn: BehaviorSubject<boolean>;

  constructor() {
    this.isLoggedIn = new BehaviorSubject(true);
  }
}
