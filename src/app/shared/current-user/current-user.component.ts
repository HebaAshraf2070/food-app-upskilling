import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedSerService } from '../services/shared-ser.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-current-user',
  templateUrl: './current-user.component.html',
  styleUrls: ['./current-user.component.scss']
})
export class CurrentUserComponent implements OnInit {


  constructor(

    private _SharedSerService: SharedSerService,
    private _Toastr: ToastrService,
    private _Router: Router,
  ) { }




  ngOnInit(): void {
    this.getUserData();
  }

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
    // console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  // ============================================
  // get user current profile
  currentUserForm: FormGroup = new FormGroup({
    userName: new FormControl(null),
    email: new FormControl(null),
    country: new FormControl(null),
    phoneNumber: new FormControl(null),
    profileImage: new FormControl(),
    confirmPassword: new FormControl(null),
  });

  currentUserData: any = '';

  getUserData() {
    this._SharedSerService.getCurrentUser().subscribe({
      next: (resp) => {
        this.currentUserData = resp;
        // console.log(this.currentUserData);

      },
      error: (err) => {
        console.log(err);

      }, complete: () => {
        this.currentUserForm.patchValue({
          userName: this.currentUserData.userName,
          email: this.currentUserData.email,
          country: this.currentUserData.country,
          phoneNumber: this.currentUserData.phoneNumber,
          profileImage: this.imgSrc,
          confirmPassword: this.currentUserData.confirmPassword,
        })
      }
    })
  }



  updateUserProfile(CrntProfileForm: FormGroup) {
    let myFormData = new FormData();

    myFormData.append("userName", CrntProfileForm.value.userName);
    myFormData.append('email', CrntProfileForm.value.email);
    myFormData.append("country", CrntProfileForm.value.country);
    myFormData.append("phoneNumber", CrntProfileForm.value.phoneNumber);
    myFormData.append("profileImage", this.imgSrc);
    myFormData.append('confirmPassword', CrntProfileForm.value.confirmPassword);


    this._SharedSerService.updateUserProfile(myFormData).subscribe({
      next: (resp) => {
        console.log(resp);
        console.log(this.currentUserData);
        this._Toastr.success('profile has been updated successfully', 'success');
        this._Router.navigate(['/dashboard/home'])
      },
      error: (err) => {
        console.log(err);

      }
    })

  }


}
