import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth-guard/auth.guard";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ImageComponent } from "./image/image.component";
import { LoginComponent } from "./login/login.component";
import { NotfoundComponent } from "./notfound/notfound.component";
import { SettingsComponent } from "./settings/settings.component";
import { UnauthorizedComponent } from "./unauthorized/unauthorized.component";
import { CreatePinComponent } from "./user/create-pin/create-pin.component";
import { UserComponent } from "./user/user.component";

const routes: Routes = [
    {
        path: "",
        component: DashboardComponent,
    },
    {
        path: "settings",
        component: SettingsComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "create",
        component: CreatePinComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "user/:id",
        component: UserComponent,
    },
    {
        path: "image/:id",
        component: ImageComponent,
    },
    {
        path: "login",
        component: LoginComponent,
    },
    {
        path: "404",
        component: NotfoundComponent,
    },
    {
        path: "unauthorized",
        component: UnauthorizedComponent,
    },
    {
        path: "**",
        redirectTo: "/404",
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
