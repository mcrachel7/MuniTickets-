import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../services/register-user/register-user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit{
  
  public username:string = "";
  public email:string = "";
  public pass1:string = "";
  public pass2:string = "";

  constructor(
    private registerService: RegisterService
  ){}
  
  ngOnInit(): void {
  }

  async registerUser(){
    
    let objRegisterUser: any = {
      username: this.username,
      email: this.email,
      password: this.pass1,
      rol: 'usuario'
    }

    if(!this.validateFields()){
      await Swal.fire({
        title: 'Algo ha ocurrido.',
        text: 'Se debe verificar que los datos esten debidamente diligenciados',
        icon: 'warning'
      });
      return;
    }

    if(!this.comparePasswords()){
      await Swal.fire({
        title: 'Algo ha ocurrido.',
        text: 'No coinciden las contraseñas ingresadas.',
        icon: 'warning'
      });
      return;  
    }

    let responseRegister = await this.registerService.registerUser(objRegisterUser).subscribe(res => {
      Swal.fire({
        title: 'Usuario registrado.',
        icon: 'success'
      });
    }, err => {
      Swal.fire({
        title: 'Algo ha ocurrido.',
        text: 'El usuario no logro registrarse.',
        icon: 'error'
      });
    });

  }

  validateFields():boolean{
    if(this.email.length<=0 || this.pass1.length<=0 || this.pass2.length<=0) return false;
    return true;
  }

  comparePasswords():boolean{
    if(this.pass1 === this.pass2) return true;
    return false;
  }

}
