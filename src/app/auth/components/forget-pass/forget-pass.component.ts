import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthserService } from '../../services/authser.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forget-pass',
  templateUrl: './forget-pass.component.html',
  styleUrls: ['./forget-pass.component.scss']
})
export class ForgetPassComponent {

  constructor(
    private _AuthserService: AuthserService,
    private _Toastr: ToastrService,
    private _Router: Router
  ) { }



  forgertPassForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email])
  })

  forgetPass(forgetPassForm: FormGroup) {
    this._AuthserService.onForgetPass(forgetPassForm.value).subscribe({
      next: (resp) => {
        console.log(resp);
        this._Toastr.success(resp.message, 'success')
      },
      error: (err) => {
        this._Toastr.error('the email is not valid', 'failed')
      },
      complete: () => {
        this._Router.navigate(['./auth/resetPassword'])
      }
    })
  }

}
