import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FAQsService } from '../../services/faqs.service';
import { LoginService } from 'src/app/modules/auth/services/login/login.service';
import { MainContentService } from 'src/app/modules/home/services/main-content/main-content.service';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-showimage',
  templateUrl: './showimage.component.html',
  styleUrls: ['./showimage.component.scss']
})
export class ShowimageComponent implements OnInit{

  FaqsForm: FormGroup;
  id: string | null;
  public role:string = "";
  private idUser!:string;
  private token!:string;


  constructor(private fb: FormBuilder, private faqsService: FAQsService,
    private loginService: LoginService,
  private mainContentService: MainContentService,
  private router: Router,
    private aRouter: ActivatedRoute){
    this.FaqsForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      type: ['', Validators.required],
      image: ['', Validators.required],
    })
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.ObtainFAQS();
    this.initDataUser();
  }



  ObtainFAQS() {
    if (this.id !== null) {
      this.faqsService.obtainFAQ(this.id).subscribe(data => {
        this.FaqsForm.setValue({
          title: data.title,
          description: data.description,
          type: data.type,
          image: data.image,
        });

        console.log(data.image);

      });
    }
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

  backFAQs(){
    this.router.navigate(['list-FAQs']);
  }

}
