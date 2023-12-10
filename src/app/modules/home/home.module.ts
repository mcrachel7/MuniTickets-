import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';

//module components
import { MainComponent } from './components/main/main.component';
import { MainContentService } from './services/main-content/main-content.service';

//modules
import { SharedModule } from 'src/app/shared/shared-module/shared-module.module';
import { DashboardModuleModule } from '../dashboard/dashboard-module/dashboard-module.module';

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgChartsModule,
    SharedModule,
    DashboardModuleModule
  ],
  providers: [
    MainContentService
  ]
})
export class HomeModule { }
