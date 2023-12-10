import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class MainContentService {

  //variables
  public AUTH_SERVER:string = "http://localhost:3000/tickets";
  public token:string = "";
  public idUser:string = "";
  public role:string = "";
  public header = new HttpHeaders();

  constructor() { }

  //provides the token stored on the local storage
  public getToken():string{
    if(!this.token){
      this.token = localStorage.getItem("ACCESS_TOKEN") || "";
    }
    return this.token;
  }

  //provides the user ID stored on the local storage
  public getIdUser():string{
    if(!this.idUser){
      this.idUser = localStorage.getItem("ID_USER") || "";
    }
    return this.idUser;
  }

  //provides the role stored on the local storage
  public getRoleUser():string{
    if(!this.role){
      this.role = localStorage.getItem("ROLE_USER") || "";
    }
    return this.role;
  }

  //deletes stored items on the local storage to provoke a logout
  public logOut(){
    this.idUser = "";
    this.role = "";
    this.token = "";

    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('ID_USER');
    localStorage.removeItem('ROLE_USER');
  }



}
