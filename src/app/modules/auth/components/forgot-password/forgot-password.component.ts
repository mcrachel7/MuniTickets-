import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { RecoverUserService } from '../../services/recover-user/recover-user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit{
  resetForm: FormGroup;
  resetRequestSuccess: boolean = false;
  resetError: boolean = false;
  resetToken: string = '';

  constructor(private recoverUserService : RecoverUserService,
    private formBuilder: FormBuilder,
    private aRouter: ActivatedRoute,
    private router: Router){
      this.resetForm = this.formBuilder.group({
        password: ['', Validators.required]
      });

      this.aRouter.queryParams.subscribe((params) => {
        this.resetToken = params['resetToken'];
      });
    }

  ngOnInit(): void {
    this.onSubmitResetPassword();
  }

  onSubmitResetPassword() {

    const email = this.recoverUserService.getEmail();
    const newPassword = this.resetForm.get('password')?.value;

    if (newPassword && this.resetToken) {
      // Call the resetPassword service method with email, resetToken, and newPassword
      this.recoverUserService.resetPassword(email, this.resetToken, newPassword).subscribe(
        (response) => {
          // Password reset was successful
          // You can handle success actions here
          console.log('Password reset successful', response);
          this.resetRequestSuccess = true;
          this.router.navigate(['/login'])
        },
        (error) => {
          // Password reset request failed, handle the error
          console.error('Password reset failed', error);
          this.resetError = true;
        }
      );

      // Reset the form
      this.resetForm.reset();
    }
  }

  }



