import { Component, OnInit  } from '@angular/core';

//services
import { LoginService } from 'src/app/modules/auth/services/login/login.service';
import { MainContentService } from 'src/app/modules/home/services/main-content/main-content.service';
import { SharedService } from 'src/app/shared/services/shared.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  //variables
  public ProfileName: any;
  private idUser!:string;
  private token!:string;


  constructor(
    private loginService: LoginService,
    private mainContentService: MainContentService,
    private sharedService: SharedService
  ){}

  ngOnInit(): void {
    this.thisProfileName();
  }

  toggleMenu() {
    this.sharedService.toggleMenuVisibility();
  }


  thisProfileName() {
    this.idUser = this.mainContentService.getIdUser();
    this.token = this.mainContentService.getToken();

    this.loginService.getProfile(this.idUser, this.token).subscribe(
      (data: any) => {
        if (data && data.username) {
          console.log(data);
          this.ProfileName = data.username;
        }
      },
      (error) => {
        console.log('Error fetching user:', error);
      }
    );
  }


}
