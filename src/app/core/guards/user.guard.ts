import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthserService } from 'src/app/auth/services/authser.service';

export const userGuard: CanActivateFn = (route, state) => {

  const _Router = inject(Router);
  const _AuthserService = inject(AuthserService);

  if (localStorage.getItem('userToken') !== null && localStorage.getItem('role') == "SystemUser") {
    return true;
  } else {
    _AuthserService.getProfile();
    _Router.navigate(['/dashboard']);
    return false;
    // don't write code after return false as func of guard stop working at return false
  }

};
