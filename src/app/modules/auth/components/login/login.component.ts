import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public user: string = "";
  public password: string = "";

  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
  }

  async login() {

    let objUser: any = {
      email: this.user,
      password: this.password
    }

    if (!this.validateFormFields()) {
      await Swal.fire({
        title: 'Algo ha ocurrido.',
        text: 'Se debe verificar que los datos ingresados sean correctos.',
        icon: 'error'
      });
      return;
    }

    let responseLogin = await this.loginService.loginUser(objUser).subscribe(res => {
        this.router.navigateByUrl('/home/main');
    }, err => {
      Swal.fire({
        title: 'Algo ha ocurrido.',
        text: 'Credenciales de acceso incorrectas y/o no existentes.',
        icon: 'warning'
      });
    });

  }

  validateFormFields(): boolean {
    if (this.user.length <= 0 || this.password.length <= 0) return false;
    return true;
  }

}
