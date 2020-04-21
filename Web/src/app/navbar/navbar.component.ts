import { Component, OnInit } from '@angular/core';
import { faCog, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import UserService from '@services/user-service'
import { Router } from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  faSignInAlt = faSignInAlt;
  faSignOutAlt = faSignOutAlt;
  faCog = faCog;
  appName: string;
  displayName: string;
  avatar: string;
  state: string;

  constructor(
    private _userService: UserService,
    private _router: Router) {
    this.appName = "Pinterest Clone";
    this._userService.isLoggedIn.subscribe(value => {
      this.state = 'notloggedin';

      if(value) {
        this.state = 'loading';

        this._userService.getProfile().subscribe(({displayName, avatar}) => {
          this.state = 'loggedIn';
          this.displayName = displayName;
          this.avatar = avatar;
        }, error => {
          this.state = 'notloggedin';
        })
      }
    })
  }

  ngOnInit(): void {
  }

  goToSettings() {

  }

  signIn() {
    this._router.navigate(['login']);
  }

  signOut() {
    this._userService.signOut();
  }

}
