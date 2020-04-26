import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CardComponent } from './card/card.component';
import { SettingsComponent } from './settings/settings.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserComponent } from './user/user.component';
import { CreatePinComponent } from './user/create-pin/create-pin.component';
import { ImageComponent } from './image/image.component';
import { ImageUploadComponent } from './user/image-upload/image-upload.component';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { ZoomImageModalComponent } from './modals/zoom-image/zoom-image-modal.component';
import { LoginModalComponent } from './modals/login/login-modal.component';
import { ReportImageModalComponent } from './modals/report-image/report-image-modal.component';
import { RemoveImageModalComponent } from './modals/remove-image/remove-image-modal.component';
import { ShareImageModalComponent } from './modals/share-image/share-image-modal.component';
import { AddImageModalComponent } from './modals/add-image/add-image-modal.component';
import { AddCommentFormComponent } from './image/add-comment-form/add-comment-form.component';
import { CommentComponent } from './image/comment/comment.component';
import { TokenInterceptor } from './token-interceptor/token.interceptor';
import { LoaderComponent } from './loader/loader.component';
import { HttpImageService } from '@services/image-service/http-image.service';
import ImageService from '@services/image-service';
import UserService from '@services/user-service';
import { HttpUserService } from '@services/user-service/http.user.service';
import { CategoryComponent } from './modals/add-image/category/category.component';
import { SelectControlComponent } from './modals/report-image/select-control/select-control.component';
import Environment from '@environments/environment';
import { FakeUserService } from '@services/user-service/fake.user.service';
import { FakeImageService } from '@services/image-service/fake-image.service';
import { ReportCommentFormComponent } from './modals/report-comment-modal/report-comment-form/report-comment-form.component';
import { BadgeControlComponent } from './modals/report-comment-modal/report-comment-form/badge-control/badge-control.component';
import { ReportCommentModalComponent } from './modals/report-comment-modal/report-comment-modal.component';
import { ProgressBarComponent } from './user/progress-bar/progress-bar.component';
import { TextAnimatorComponent } from './text-animator/text-animator.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CardComponent,
    SettingsComponent,
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
    ReportImageModalComponent,
    RemoveImageModalComponent,
    ShareImageModalComponent,
    AddImageModalComponent,
    AddCommentFormComponent,
    CommentComponent,
    LoaderComponent,
    CategoryComponent,
    SelectControlComponent,
    ReportCommentFormComponent,
    BadgeControlComponent,
    ReportCommentModalComponent,
    ProgressBarComponent,
    TextAnimatorComponent
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
      useClass: Environment.useFakeServices ? FakeImageService : HttpImageService
    },
    {
      provide: UserService,
      useClass: FakeUserService
      //useClass: Environment.useFakeServices ? FakeUserService : HttpUserService
    },
    {
      provide: FileReader,
      useClass: FileReader
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
