import { Component, Input, OnInit } from '@angular/core';
import { FAQs } from '../../../models/FAQ';
import { FAQsService } from '../../../services/faqs.service';
import { LoginService } from 'src/app/modules/auth/services/login/login.service';
import { MainContentService } from 'src/app/modules/home/services/main-content/main-content.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list-faqs',
  templateUrl: './list-faqs.component.html',
  styleUrls: ['./list-faqs.component.scss']
})
export class ListFAQsComponent implements OnInit{

  listFAQs: FAQs[] = [];
  searchText!: '';
  public role:string = "";
  private idUser!:string;
  private token!:string;


constructor(private _FAQsService: FAQsService,
  private loginService: LoginService,
  private mainContentService: MainContentService,
  private router: Router){}

ngOnInit(): void {
  this.ListFAQS();
  this.initDataUser();
}



ListFAQS() {
  this._FAQsService.loadFAQs().subscribe(res => {
    this.listFAQs = res;
  });
}

showImage(){
  this.router.navigate(['/show-image']);
}


async initDataUser(){
  await this.loadUserData();
  await this.validateLoginData();
}

async loadUserData(){
  if(this.idUser == "" || this.role == ""){
    this.idUser = await this.mainContentService.getIdUser();
    this.role = await this.mainContentService.getRoleUser();
  }
}


validateLoginData(){
  if(this.idUser == "" || this.role == "" ){
    this.router.navigate(['auth']);
  }
}



}
