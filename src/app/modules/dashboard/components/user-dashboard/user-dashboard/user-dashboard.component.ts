import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LoginService } from 'src/app/modules/auth/services/login/login.service';
import { DashboardService } from '../../../services/dashboard.service';
import { FAQsService } from 'src/app/modules/FAQs/services/faqs.service';
import { Router } from '@angular/router';
import { FAQs } from 'src/app/modules/FAQs/models/FAQ';

import { MainContentService } from 'src/app/modules/home/services/main-content/main-content.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserDashboardComponent implements OnInit{

  private idUser!:string;
  private token!:string;

  public QuantityTickets: any;
  public OpenedTickets: any;
  public ClosedTickets: any;
  public QuantityInventory: any;
  listFAQs: FAQs[] = [];


  constructor(private router: Router,
    private loginService: LoginService,
    private mainContentService: MainContentService,
    private dashboardService: DashboardService){}

  ngOnInit(): void {
    this.initDataUser();
  }

  async initDataUser() {
    await this.thisQuantityTickets();
    await this.thisOpenedTickets();
    await this.thisClosedTickets();
    await this.thisQuantityInventory();
    await this.ListFAQS();
  }

  thisQuantityTickets(){
    this.idUser = this.mainContentService.getIdUser();
      this.token = this.mainContentService.getToken();
    this.dashboardService.getQuantityTicketsByUser(this.idUser, this.token).subscribe( data=>{
      console.log(data);
      this.QuantityTickets = data;
    }, error =>{
      console.log(error);
    }
    );
  }

  thisOpenedTickets(){
    this.idUser = this.mainContentService.getIdUser();
    this.token = this.mainContentService.getToken();
    this.dashboardService.getOpenedTicketsByUser(this.idUser, this.token).subscribe( data =>{
      console.log(data);
      this.OpenedTickets = data;
    }, error =>{
      console.log(error);
    }
    );
  }

  thisClosedTickets(){
    this.idUser = this.mainContentService.getIdUser();
    this.token = this.mainContentService.getToken();
    this.dashboardService.getClosedTicketsByUser(this.idUser, this.token).subscribe( data =>{
      console.log(data);
      this.ClosedTickets = data;
    }, error =>{
      console.log(error);
    }
    );
  }

  thisQuantityInventory(){
    this.idUser = this.mainContentService.getIdUser();
    this.token = this.mainContentService.getToken();
    this.dashboardService.getQuantityInventory(this.idUser, this.token).subscribe( data =>{
      console.log(data);
      this.QuantityInventory = data;
    }, error =>{
      console.log(error);
    }
    );
  }

  ListFAQS() {
    this.dashboardService.getDashboardFAQS().subscribe(res  => {
      this.listFAQs = res;
    });
  }

  createTicket(){
    this.router.navigate(['/create-ticket']);
  }

  createInventory(){
    this.router.navigate(['/create-inventory']);
  }



}
