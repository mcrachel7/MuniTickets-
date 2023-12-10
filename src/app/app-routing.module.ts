import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//componentes
import { ListTicketsComponent } from './modules/ticket/components/list-tickets/list-tickets.component';
import { CreateTicketComponent } from './modules/ticket/components/create-ticket/create-ticket.component';
import { AdminTicketsComponent } from './modules/ticket/components/admin-tickets/admin-tickets.component';
import { CreateInventoryComponent } from './modules/inventory/components/create-inventory/create-inventory/create-inventory.component';
import { ListInventoryComponent } from './modules/inventory/components/list-inventory/list-inventory/list-inventory.component';
import { AdminListInventoryComponent } from './modules/inventory/components/admin-list-inventory/admin-list-inventory.component';
import { CreateFAQsComponent } from './modules/FAQs/components/create-FAQs/create-faqs/create-faqs.component';
import { ListFAQsComponent } from './modules/FAQs/components/list-FAQs/list-faqs/list-faqs.component';
import { AdminCommentComponent } from './modules/ticket/components/admin-comment/admin-comment/admin-comment.component';
import { ShowimageComponent } from './modules/FAQs/components/showimage/showimage.component';
import { CreatePetitionComponent } from './modules/petition/components/create-petition/create-petition.component';
import { AdminNotificationComponent } from './modules/socket/components/admin-notification/admin-notification.component';
import { UserNotificationComponent } from './modules/socket/components/user-notification/user-notification.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(auth => auth.AuthModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then(auth => auth.HomeModule)
  },
  {
    path: 'view-ticket', component: ListTicketsComponent
  },
  {
    path: 'create-ticket', component: CreateTicketComponent
  },
  {
    path: 'list-tickets', component:AdminTicketsComponent
  },
  {
    path: 'edit-status/:id', component: CreateTicketComponent
  },
  {
    path: 'create-inventory', component: CreateInventoryComponent
  },
  {
    path: 'view-inventory', component: ListInventoryComponent
  },
  {
    path: 'list-inventory', component: AdminListInventoryComponent
  },
  {
    path: 'update-inventory/:id', component: CreateInventoryComponent
  },
  {
    path: 'list-FAQs', component: ListFAQsComponent
  },
  {
    path: 'create-FAQs', component: CreateFAQsComponent
  },
  {
    path: 'update-ticket/:id', component: AdminCommentComponent
  },
  {
    path: 'show-image/:id', component: ShowimageComponent
  },
  {
    path: 'create-petition', component: CreatePetitionComponent
  },
  {
    path: 'admin-notification', component: AdminNotificationComponent
  },
  {
    path: 'user-notification', component: UserNotificationComponent
  },
  {
    path:'',
    pathMatch: 'prefix',
    redirectTo: 'auth'
},
{
    path: '**',
    pathMatch: 'prefix',
    redirectTo: 'auth'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
