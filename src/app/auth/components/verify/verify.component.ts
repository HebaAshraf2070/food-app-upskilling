import { Component, Inject } from '@angular/core';
import { AuthserService } from '../../services/authser.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent {

  constructor(
    private _AuthserService: AuthserService,
    private _Toastr: ToastrService,
    private _Router: Router,

  ) { }


  // formgroup
  verifyForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    code: new FormControl(null, [Validators.required])
  })




  verify(verifyForm: FormGroup) {
    this._AuthserService.onVerify(verifyForm.value).subscribe({
      next: (resp) => {
        console.log('Verification Response:', resp);
        this._Toastr.success("account has been successfully verified", 'success')
      },
      error: (err) => {
        console.error('Verification Error:', err);
        this._Toastr.error("verificationcode is not valid", 'failed')
      },
      complete: () => {

        this._Router.navigate(['/auth'])
      }
    })
  }

}
