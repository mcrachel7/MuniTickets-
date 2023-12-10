import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { RecoverUserComponent } from './components/recover-user/recover-user.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register-user',
        component: RegisterUserComponent
    },
    {
        path: 'recover-user',
        component: RecoverUserComponent
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent
    },
    {
        path:'',
        pathMatch: 'prefix',
        redirectTo: 'login'
    },
    {
        path: '**',
        pathMatch: 'prefix',
        redirectTo: 'login'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AuthRoutingModule { }
