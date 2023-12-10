import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-bootstrap/carousel'; // Add this line


import { HttpClientModule } from '@angular/common/http';

import { NgChartsModule } from 'ng2-charts';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared-module/shared-module.module';
import { TicketModuleModule } from './modules/ticket/ticket-module/ticket-module.module';
import { DashboardModuleModule } from './modules/dashboard/dashboard-module/dashboard-module.module';
import { InventoryModulesModule } from './modules/inventory/inventory-modules/inventory-modules.module';
import { FAQsModuleModule } from './modules/FAQs/faqs-module/faqs-module.module';
import { PetitionModule } from './modules/petition/petition-module/petition/petition.module';
import { NotificationModule } from './modules/socket/modules/notification/notification.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CarouselModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    TicketModuleModule,
    NgChartsModule,
    DashboardModuleModule,
    InventoryModulesModule,
    FAQsModuleModule,
    PetitionModule,
    NotificationModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
