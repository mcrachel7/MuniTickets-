import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs';

//modules
import { FAQs } from '../models/FAQ';
import { LoginService } from '../../auth/services/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class FAQsService {

  //variables
  public AUTH_SERVER: string= "http://localhost:3000/FAQs"
  public idUser:string = "";
  public header = new HttpHeaders();

  constructor(private httpClient:HttpClient,
    private loginService: LoginService) { }

  //create a new faq with image file
  createFAQs(objFAQs: FAQs, token: string, imageFile: File | null): Observable<any>{

    //create a new FormData object
    let formData = new FormData();

    //if an 'imageFile' is provided, append it to the FormData
    if (imageFile) {
      formData.append('image', imageFile);
    }

    //append the other properties of 'objFAQs'
    formData.append('title', objFAQs.title);
    formData.append('description', objFAQs.description);
    formData.append('type', objFAQs.type);

    //create a HttpHeaders with authorization and other headers
    const headers = new HttpHeaders()
      .set('Authorization', token)
      .set('Access-Control-Allow-Origin', '*');

    //send an HTTP POST request to create a new faq
    return this.httpClient.post<any>(
      this.AUTH_SERVER + '/new-FAQ',
      formData,
      { headers: headers }
    ).pipe(
      tap(res => {
        console.log(res);
        if (res) {
          this.loginService.saveToken(res.token);
        }
      })
    );
}

//list all the created faqs
loadFAQs():Observable<any>{
  return this.httpClient.get(this.AUTH_SERVER+"/list-FAQ")

}

//obtain the specific faq by id
obtainFAQ(id: string): Observable<any>
{
  return this.httpClient.get(this.AUTH_SERVER +"/obtain-FAQs/"+id)
}

}
