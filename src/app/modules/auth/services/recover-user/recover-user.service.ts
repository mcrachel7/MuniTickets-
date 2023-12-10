import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecoverUserService {

  public AUTH_SERVER:string = "http://localhost:3000/api";
  private email!: string;

  constructor(private http: HttpClient) { }

  setEmail(email: string) {
    this.email = email;
  }

  getEmail() {
    return this.email;
  }

  // Method to request a password reset
  requestPasswordReset(email: string): Observable<any> {
    const body = { email };
    return this.http.post(this.AUTH_SERVER+'/reset-password-request', body);
  }

  // Method to reset the password
  resetPassword(email: string, resetToken: string, newPassword: string): Observable<any> {
    const body = { email, resetToken, newPassword };
    return this.http.put(this.AUTH_SERVER+'/reset-password', body);
  }

}
