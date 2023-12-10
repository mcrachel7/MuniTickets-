import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { MainContentService } from 'src/app/modules/home/services/main-content/main-content.service';
import { SharedService } from 'src/app/shared/services/shared.service';


@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit{

  public idUser:string = "";
  public role:string = "";
  public token:string = "";
  showInventoryMenu: boolean = false;
  showTicketMenu: boolean = false;

  isMenuVisible: boolean = true;


  constructor(
    private router: Router,
    private mainContentService: MainContentService,
    private sharedService: SharedService
  ){
    this.sharedService.isMenuVisible$.subscribe((isVisible) => {
      this.isMenuVisible = isVisible;
    });
  }

  ngOnInit(): void {
    this.initDataUser();
  }



  async initDataUser(){
    await this.loadUserData();
    await this.validateLoginData();
  }

  async loadUserData(){
    if(this.idUser == "" || this.role == "" ){
      this.idUser = await this.mainContentService.getIdUser();
      this.role = await this.mainContentService.getRoleUser();
    }
  }


  validateLoginData(){
    if(this.idUser == "" || this.role == "" ){
      this.router.navigate(['auth']);
    }
  }

  createTicket(){
    this.router.navigate(['/create-ticket']);
  }
  viewHistory(){
    this.router.navigate(['/view-ticket']);
  }
  adminTickets(){
    this.router.navigate(['/list-tickets']);
  }
  home(){
    this.router.navigate(['home']);
  }
  newInventory(){
    this.router.navigate(['/create-inventory']);
  }
  viewInventory(){
    this.router.navigate(['/view-inventory']);
  }
  userNotification(){
    this.router.navigate(['/user-notification']);
  }

  logOut(){
    this.idUser = "";
    this.role = "";
    this.token = "";
    this.mainContentService.logOut();
    this.router.navigate(['auth']);
  }

  viewFAQs(){
    this.router.navigate(['/list-FAQs']);
  }



toggleInventoryMenu() {
  this.showInventoryMenu = !this.showInventoryMenu;
}

toggleTicketMenu() {
  this.showTicketMenu = !this.showTicketMenu;
}



}
