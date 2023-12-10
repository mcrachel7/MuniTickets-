import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchPipe } from '../pipe/search.pipe';

//module components
import { CreateInventoryComponent } from '../components/create-inventory/create-inventory/create-inventory.component';
import { ListInventoryComponent } from '../components/list-inventory/list-inventory/list-inventory.component';
import { AdminListInventoryComponent } from '../components/admin-list-inventory/admin-list-inventory.component';

//module
import { SharedModule } from 'src/app/shared/shared-module/shared-module.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CreateInventoryComponent,
    ListInventoryComponent,
    AdminListInventoryComponent,
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
export class InventoryModulesModule { }
