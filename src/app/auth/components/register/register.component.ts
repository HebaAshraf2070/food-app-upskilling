import { Component } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { AuthserService } from '../../services/authser.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { VerifyPopUpComponent } from '../verifyPopUp/verifyPopUp.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(
    private _AuthserService: AuthserService,
    private _toastr: ToastrService,
    private _Router: Router,
    public dialog: MatDialog
  ) { }

  // var
  isHide: boolean = true;




  // ============================================
  // dropzone to upload img in form of file
  files: File[] = [];
  imgSrc: any = '';

  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);

    // var 
    this.imgSrc = this.files[0];

  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
  // =====================================

  // registerForm in shape of object 
  registerForm = new FormGroup({
    userName: new FormControl(null, [Validators.required, Validators.maxLength(20), Validators.minLength(3)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    country: new FormControl(null, [Validators.required]),
    phoneNumber: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9@]{6,20}$/)]),
    confirmPassword: new FormControl(null, [Validators.required]),
    profileImage: new FormControl(null)
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
  // reg func
  register(registerForm: FormGroup) {

    // convert registerForm into formData
    let myFormData = new FormData();

    myFormData.append('userName', registerForm.value.userName);
    myFormData.append('email', registerForm.value.email);
    myFormData.append('country', registerForm.value.country);
    myFormData.append('phoneNumber', registerForm.value.phoneNumber);
    myFormData.append('password', registerForm.value.password);
    myFormData.append('confirmPassword', registerForm.value.confirmPassword);
    myFormData.append('profileImage', this.imgSrc);

    //
    this._AuthserService.onRegister(myFormData).subscribe({
      next: (resp) => {
        console.log(resp);
        this._toastr.success('you have successfully registered', 'success');
        this.openDialog();
      },
      error: (err) => {

        console.log(err);
        this._toastr.error('register has failed', "failed")
      },
      complete: () => {
        // this._Router.navigate(['/auth/verify']);

      }
    })
  }

  // ------------------------------------
  // verify coode popup

  // verifyForm = new FormGroup({
  //   email: new FormControl(null, [Validators.required, Validators.email]),
  //   code: new FormControl(null, [Validators.required])
  // })


  code: string = '';
  email: string = '';


  // open angular material dialog
  openDialog(): void {
    const dialogRef = this.dialog.open(VerifyPopUpComponent, {
      data: { email: this.email, code: this.code },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed ', result);
      if (result) {
        this.verify(result);
      }
    });
  }


  verify(data: any) {
    this._AuthserService.onVerify(data).subscribe({
      next: (resp) => {
        // console.log('Verification Response:', resp);
        this._toastr.success("account has been successfully verified", 'success')
      },
      error: (err) => {
        // console.error('Verification Error:', err.error.message);
        this._toastr.error("verification code is not valid", 'failed')
      },
      complete: () => {
        this._Router.navigate(['/auth'])
      }
    })



  }



}



