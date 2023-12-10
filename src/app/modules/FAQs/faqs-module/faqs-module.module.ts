import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchPipe } from '../pipe/search.pipe';
import { RouterModule } from '@angular/router';

//module components
import { CreateFAQsComponent } from '../components/create-FAQs/create-faqs/create-faqs.component';
import { ListFAQsComponent } from '../components/list-FAQs/list-faqs/list-faqs.component';
import { ShowimageComponent } from '../components/showimage/showimage.component';

//module
import { SharedModule } from 'src/app/shared/shared-module/shared-module.module';

@NgModule({
  declarations: [
    CreateFAQsComponent,
    ListFAQsComponent,
    ShowimageComponent,
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
export class FAQsModuleModule { }
