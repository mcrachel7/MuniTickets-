import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

//services
import { LoginService } from '../login/login.service';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  //variables
  public AUTH_SERVER:string = "http://localhost:3000/api";
  public token:string = "";

  constructor(
    private httpClient:HttpClient,
    private loginService: LoginService
  ) { }

  //sends user registration data to an auth server
  registerUser(user: any): Observable<any>{
    return this.httpClient.post<any>(
      this.AUTH_SERVER+"/register", user
    ).pipe(tap(
        (res) => {
          if(res){
            console.log(res);
            this.loginService.saveToken(res.token);
          }
        })
      );
  }


}
