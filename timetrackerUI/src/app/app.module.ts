import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthComponent } from './components/auth/auth.component';
import { MaterialModule } from './material/material.module';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LogoutConfirmationDialogComponent, SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ReportsComponent } from './components/reports/reports.component';
import { AddProjectComponent } from './components/add-project/add-project.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';
import { StopwatchComponent } from './components/stopwatch/stopwatch.component';
import { ProjectService } from './services/project.service';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { DeleteAccountConfirmationDialogComponent, ProfileComponent } from './components/profile/profile.component';
import { UserService } from './services/user.service';
import { NgChartsModule } from 'ng2-charts';
import { AddStageComponent } from './components/add-stage/add-stage.component';
import { EditProjectComponent } from './components/edit-project/edit-project.component';
import { EditStageComponent } from './components/edit-stage/edit-stage.component';
import { AuthGuard } from './guards/auth.guard';
import { ChangePasswordComponent } from './components/change-password/change-password.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    SidebarComponent,
    DashboardComponent,
    ProjectsComponent,
    ReportsComponent,
    AddProjectComponent,
    StopwatchComponent,
    ProjectDetailsComponent,
    ProfileComponent,
    AddStageComponent,
    EditProjectComponent,
    EditStageComponent,
    LogoutConfirmationDialogComponent,
    DeleteAccountConfirmationDialogComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    CommonModule,
    HttpClientModule,
    NgxMatTimepickerModule,
    NgxMatDatetimePickerModule,
    NgxMatMomentModule,
    ReactiveFormsModule,
    NgChartsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, ProjectService, UserService, AuthGuard],
  bootstrap: [AppComponent],
  entryComponents: [AddProjectComponent]
})
export class AppModule { }
