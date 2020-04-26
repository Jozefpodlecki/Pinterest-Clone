import { Component, OnInit } from '@angular/core';
import { faCog, faSignInAlt, faSignOutAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import UserService from '@services/user-service'
import { Router } from '@angular/router';
import { AuthContextService } from '@services/auth-context/auth-context.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  faSignInAlt = faSignInAlt;
  faSignOutAlt = faSignOutAlt;
  faCog = faCog;
  faPlus = faPlus;
  appName: string;
  profileLink: string;
  displayName: string;
  avatar: string;
  state: string;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _authContextService: AuthContextService) {
    this.appName = "Pinterest Clone";
    this._authContextService.isLoggedIn.subscribe(value => {
      this.state = 'notloggedin';

      if(value) {
        this.state = 'loading';

        this._userService.getProfile().subscribe(({id, displayName, avatar}) => {
          this.profileLink = `/user/${id}`;
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
