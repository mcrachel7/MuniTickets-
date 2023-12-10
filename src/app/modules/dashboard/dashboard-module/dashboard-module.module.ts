import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-bootstrap/carousel';

//module components
import { UserDashboardComponent } from '../components/user-dashboard/user-dashboard/user-dashboard.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { DashboardService } from '../services/dashboard.service';

//module
import { SharedModule } from 'src/app/shared/shared-module/shared-module.module';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  declarations: [
    DashboardComponent,
    UserDashboardComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    CarouselModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports:[DashboardComponent, UserDashboardComponent],
  providers: [
    DashboardService,
  ]
})
export class DashboardModuleModule { }
