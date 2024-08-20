import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthserService } from '../../services/authser.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private _AuthserService: AuthserService,
    private _Router: Router,
    private _toastr: ToastrService
  ) { }



  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9@]{6,20}$/)])
  })


  login(loginForm: FormGroup) {
    this._AuthserService.onlogin(loginForm.value).subscribe({
      next: (resp) => {
        console.log(resp);
        this._toastr.success('you have successfully loged in', 'success');
        localStorage.setItem('userToken', resp.token);//save token
        this._AuthserService.getProfile();//call func that has token mfkok

      },
      error: (err) => {
        this._toastr.error(err.error.message, "failed")
      },
      complete: () => {
        this._Router.navigate(['/dashboard'])
      }
    })
  }

}
