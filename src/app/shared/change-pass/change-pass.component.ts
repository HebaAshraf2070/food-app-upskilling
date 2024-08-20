import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedSerService } from '../services/shared-ser.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.scss']
})
export class ChangePassComponent {


  constructor(
    public dialogRef: MatDialogRef<ChangePassComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _SharedSerService: SharedSerService,
    private _Toastr: ToastrService,

  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }



  changePasswordForm = new FormGroup({
    oldPassword: new FormControl(null, [Validators.required, Validators.pattern('^(?=.?[A-Z])(?=.?[a-z])(?=.?[0-9])(?=.?[#?!@$%^&*-]).{8,16}$')]),
    newPassword: new FormControl(null, [Validators.required, Validators.pattern('^(?=.?[A-Z])(?=.?[a-z])(?=.?[0-9])(?=.?[#?!@$%^&*-]).{8,16}$')]),
    confirmNewPassword: new FormControl(null, [Validators.required, Validators.pattern('^(?=.?[A-Z])(?=.?[a-z])(?=.?[0-9])(?=.?[#?!@$%^&*-]).{8,16}$')]),
  });

  onSubmit(data: FormGroup) {
    return this._SharedSerService.onChangePassword(data.value).subscribe({
      next: (res) => {
        // console.log(res);
        res = this.changePasswordForm;
        // this._Toastr.success('password has been changed successfully', 'success')
      },
      error: (err: any) => {
        // console.log(err.error.message);
        this._Toastr.error(err.error.message, 'error!');
      },
      complete: () => {
        this.dialogRef.close();
        this._Toastr.success('Password has been updated successfully', 'Done');
      },
    })


  }








}
