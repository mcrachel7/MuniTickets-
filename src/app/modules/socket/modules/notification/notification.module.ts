import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//module components
import { AdminNotificationComponent } from '../../components/admin-notification/admin-notification.component';
import { UserNotificationComponent } from '../../components/user-notification/user-notification.component';

//module
import { SharedModule } from 'src/app/shared/shared-module/shared-module.module';

@NgModule({
  declarations: [
    AdminNotificationComponent,
    UserNotificationComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class NotificationModule { }
