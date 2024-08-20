import { Component } from '@angular/core';
import { AuthserService } from '../../services/authser.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormControlOptions } from '@angular/forms';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.scss']
})
export class ResetPassComponent {
  constructor(
    private _AuthserService: AuthserService,
    private _ToastrService: ToastrService,
    private _Router: Router,
  ) { }

  resetPassForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9@]{6,20}$/)]),
    confirmPassword: new FormControl(null, [Validators.required]),
    seed: new FormControl(null, [Validators.required])
  }, { validators: [this.confirmPass] } as FormControlOptions)


  confirmPass(formreg: FormGroup): void {
    const password = formreg.get(`password`);
    const confirmPassword = formreg.get(`confirmPassword`);

    if (confirmPassword?.value == "") {
      confirmPassword?.setErrors({ require: true })

    }
    else if (password?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({ notsame: true })
    }

  }

  resetPass(resetPassForm: FormGroup) {
    this._AuthserService.onResetPass(resetPassForm.value).subscribe({
      next: (resp) => {
        this._ToastrService.success('password has been reset successfully', 'success')
      },
      error: (err) => {
        this._ToastrService.error('entered inf is not valid', 'failed')
      },
      complete: () => {
        this._Router.navigate(['/auth/login'])
      }
    })
  }



}
