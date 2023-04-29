import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NgToastModule } from 'ng-angular-popup';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgToastModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    NgbCollapseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
