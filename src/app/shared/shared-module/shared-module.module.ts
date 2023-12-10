import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

//module components
import { SideBarComponent } from '../Components/side-bar/side-bar/side-bar.component';
import { HeaderComponent } from '../Components/header/header/header.component';
import { AdminSideBarComponent } from '../Components/admin-side-bar/admin-side-bar/admin-side-bar.component';
import { FooterComponent } from '../Components/footer/footer/footer.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    SideBarComponent,
    HeaderComponent,
    AdminSideBarComponent,
    FooterComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule
  ],
  exports:[
    SideBarComponent,
    HeaderComponent,
    AdminSideBarComponent,
    FooterComponent,
    CommonModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
