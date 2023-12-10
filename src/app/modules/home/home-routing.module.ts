import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './components/main/main.component';

const routes: Routes = [
    {
        path: 'content',
        component: MainComponent
    },
    {
        path:'',
        pathMatch: 'prefix',
        redirectTo: 'content'
    },    
    {
        path: '**',
        pathMatch: 'prefix',
        redirectTo: 'content'
    } 
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class HomeRoutingModule { }