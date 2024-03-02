import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';

export const isLoginGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);
  let user;
  userService.user$.subscribe((data) => (user = data)).unsubscribe();
  if (!user) {
    router.navigate(['login']);
  }
  console.log('guard user', user);
  return Boolean(user);
};
