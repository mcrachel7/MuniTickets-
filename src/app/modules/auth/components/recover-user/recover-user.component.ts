import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RecoverUserService } from '../../services/recover-user/recover-user.service';

@Component({
  selector: 'app-recover-user',
  templateUrl: './recover-user.component.html',
  styleUrls: ['./recover-user.component.scss']
})
export class RecoverUserComponent implements OnInit{
  resetForm: FormGroup; // Create a form group for the email input
  resetRequestSuccess: boolean = false; // Flag to track successful password reset requests
  resetError: boolean = false; // Error message for reset request failure


  constructor(private recoverUserService: RecoverUserService,
    private formBuilder: FormBuilder){
      this.resetForm = this.formBuilder.group({
        email: ['', Validators.required]
      });
    }

  ngOnInit(): void {
  }

  onSubmitResetRequest() {
    if (this.resetForm && this.resetForm.valid){
      const email = this.resetForm.get('email')?.value;

      this.recoverUserService.setEmail(email);

      // Send the password reset request to the service
      this.recoverUserService.requestPasswordReset(email).subscribe(
        () => {
          // Password reset request was successful
          this.resetRequestSuccess = true;
        },
        (error) => {
          // Password reset request failed, display an error message
          this.resetError = true;
        }
      );

      // Reset the form
      this.resetForm.reset();
    }
  }

}
