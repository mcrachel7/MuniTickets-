import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//module components
import { LoginService } from './services/login/login.service';
import { RegisterService } from './services/register-user/register-user.service';
import { RecoverUserService } from './services/recover-user/recover-user.service';
import { LoginComponent } from './components/login/login.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { RecoverUserComponent } from './components/recover-user/recover-user.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterUserComponent,
    RecoverUserComponent,
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers:[
    LoginService,
    RegisterService,
    RecoverUserService
  ]
})
export class AuthModule { }
