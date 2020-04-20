import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CardComponent } from './dashboard/card/card.component';
import { SettingsComponent } from './settings/settings.component';
import { ProfileComponent } from './profile/profile.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserComponent } from './user/user.component';
import { CreatePinComponent } from './profile/create-pin/create-pin.component';
import { ImageComponent } from './image/image.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { UserCardComponent } from './user/user-card/user-card.component';
import { ZoomImageModalComponent } from './modals/zoom-image/zoom-image-modal.component';
import { LoginModalComponent } from './modals/login/login-modal.component';
import { ReportImageModalComponent } from '.modals/report-image/report-image-modal.component';
import { RemoveImageModalComponent } from '.modals/remove-image/remove-image-modal.component';
import { ShareImageModalComponent } from '.modals/share-image/share-image-modal.component';
import { AddImageModalComponent } from '.modals/add-image/add-image-modal.component';
import { AddCommentFormComponent } from './image/add-comment-form/add-comment-form.component';
import { CommentComponent } from './image/comment/comment.component';
import { TokenInterceptor } from './token-interceptor/token.interceptor';
import { LoaderComponent } from './loader/loader.component';
import { HttpImageService } from 'src/app/image-service/http.image.service';
import ImageService from 'src/app/image-service';
import UserService from 'src/app/user-service';
import { HttpUserService } from 'src/app/user-service/http.user.service';
import { CategoryComponent } from '.modals/add-image/category/category.component';
import { SelectControlComponent } from './modals/report-image/select-control/select-control.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CardComponent,
    SettingsComponent,
    ProfileComponent,
    FooterComponent,
    NavbarComponent,
    LoginModalComponent,
    UserComponent,
    CreatePinComponent,
    ZoomImageModalComponent,
    ImageComponent,
    ImageUploadComponent,
    LoginComponent,
    NotfoundComponent,
    UnauthorizedComponent,
    UserCardComponent,
    ReportImageModalComponent,
    RemoveImageModalComponent,
    ShareImageModalComponent,
    AddImageModalComponent,
    AddCommentFormComponent,
    CommentComponent,
    LoaderComponent,
    CategoryComponent,
    SelectControlComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    DragDropModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: ImageService,
      useClass: HttpImageService
    },
    {
      provide: UserService,
      useClass: HttpUserService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
