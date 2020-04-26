import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from "@angular/router";
import { AuthContextService } from "@services/auth-context/auth-context.service";
import UserService from "@services/user-service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class AuthGuard implements CanActivate {
    constructor(
        private _authContextService: AuthContextService,
        private _router: Router
    ) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        const loggedIn = this._authContextService.isLoggedIn.value;

        if (!loggedIn) {
            this._router.navigateByUrl("/unauthorized");
            return false;
        }

        return true;
    }
}
