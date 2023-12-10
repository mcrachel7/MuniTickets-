import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FAQs } from '../../../models/FAQ';
import { FAQsService } from '../../../services/faqs.service';
import { LoginService } from 'src/app/modules/auth/services/login/login.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { MainContentService } from 'src/app/modules/home/services/main-content/main-content.service';


@Component({
  selector: 'app-create-faqs',
  templateUrl: './create-faqs.component.html',
  styleUrls: ['./create-faqs.component.scss']
})
export class CreateFAQsComponent implements OnInit{
  faqsForm: FormGroup;
  private token!:string;
  uploadedImage: File | null = null;

  constructor( private fb: FormBuilder, private router: Router,
    private faqsService: FAQsService,
    private loginService: LoginService,
    private mainContentService: MainContentService,
    private http: HttpClient) {
      this.faqsForm = this.fb.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        type: ['', Validators.required],
        image: ['']
      })
    }

  ngOnInit(): void {}

  onFileSelected(event: any) {
    this.uploadedImage = event.target.files[0] as File;
  }


  addFAQs(){
    this.token = this.mainContentService.getToken();

    if (this.uploadedImage) {
      const faqs: FAQs = {
        title: this.faqsForm.get('title')?.value,
        description: this.faqsForm.get('description')?.value,
        type: this.faqsForm.get('type')?.value,
        image: '',
        createdAt: this.getDate()
      };

      this.faqsService.createFAQs(faqs, this.token, this.uploadedImage).subscribe(res => {
        console.log(faqs);
        this.router.navigate(['list-FAQs']);
      });
    }
    else{
      const faqs: FAQs = {
        title: this.faqsForm.get('title')?.value,
        description: this.faqsForm.get('description')?.value,
        type: this.faqsForm.get('type')?.value,
        image: '',
        createdAt: this.getDate()
      };

      this.faqsService.createFAQs(faqs, this.token, null).subscribe(res => {
        console.log(faqs);
        this.router.navigate(['list-FAQs']);
      });
}
  }

  private getDate():string{
    let date: Date = new Date();
    return date.toDateString();
  }



}
