import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const orderGuard: CanActivateFn = (route, state) => {
  const _Router = inject(Router);
  if (localStorage.getItem('_token') !== null) {
    _Router.navigate(['/home']);
    return true;
  } else {
    _Router.navigate(['/login']);
    return false;
  }
};
