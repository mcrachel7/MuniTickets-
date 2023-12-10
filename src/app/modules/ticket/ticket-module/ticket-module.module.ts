import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared-module/shared-module.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//module components
import { AdminTicketsComponent } from '../components/admin-tickets/admin-tickets.component';
import { CreateTicketComponent } from '../components/create-ticket/create-ticket.component';
import { ListTicketsComponent } from '../components/list-tickets/list-tickets.component';
import { AdminCommentComponent } from '../components/admin-comment/admin-comment/admin-comment.component';

//modules
import { SearchPipe } from '../pipe/search.pipe';
import { RouterModule } from '@angular/router';


@NgModule({

  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  declarations: [
    AdminTicketsComponent,
    CreateTicketComponent,
    ListTicketsComponent,
    AdminCommentComponent,
    SearchPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule
  ]
})
export class TicketModuleModule { }
