import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//services
import { MainContentService } from 'src/app/modules/home/services/main-content/main-content.service';
import { SharedService } from 'src/app/shared/services/shared.service';


@Component({
  selector: 'app-admin-side-bar',
  templateUrl: './admin-side-bar.component.html',
  styleUrls: ['./admin-side-bar.component.scss']
})
export class AdminSideBarComponent implements OnInit{

  //variables
  public idUser:string = "";
  public role:string = "";
  public token:string = "";
  showInventoryMenu: boolean = false;
  showFAQSMenu: boolean = false;

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
    if(this.idUser == "" || this.role == "" || this.token == ""){
      this.idUser = await this.mainContentService.getIdUser();
      this.role = await this.mainContentService.getRoleUser();
      this.token = await this.mainContentService.getToken();
    }
  }


  validateLoginData(){
    if(this.idUser == "" || this.role == "" || this.token == ""){
      this.router.navigate(['auth']);
    }
  }

  adminTickets(){
    this.router.navigate(['/list-tickets']);
  }
  home(){
    this.router.navigate(['home']);
  }
  logOut(){
    this.idUser = "";
    this.role = "";
    this.token = "";
    this.mainContentService.logOut();
    this.router.navigate(['auth']);
  }

  newInventory(){
    this.router.navigate(['/create-inventory']);
  }

  viewInventory(){
    this.router.navigate(['/view-inventory']);
  }

  listAdminInventory(){
    this.router.navigate(['/list-inventory']);
  }

  newFAQs(){
    this.router.navigate(['/create-FAQs']);
  }

  listFAQs(){
    this.router.navigate(['/list-FAQs']);
  }

  createPetition(){
    this.router.navigate(['/create-petition']);
  }

  notification(){
    this.router.navigate(['/admin-notification']);
  }

  toggleInventoryMenu() {
    this.showInventoryMenu = !this.showInventoryMenu;
  }

  toggleFAQSMenu(){
    this.showFAQSMenu = !this.showFAQSMenu;
  }

}
