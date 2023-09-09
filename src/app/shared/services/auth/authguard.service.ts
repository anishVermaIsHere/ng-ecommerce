import { inject } from '@angular/core';
import { Router, RouterStateSnapshot,CanActivateFn, ActivatedRouteSnapshot } from '@angular/router';


export const canActivate:CanActivateFn=(route:ActivatedRouteSnapshot, state:RouterStateSnapshot)=>{
  const router=inject(Router);
  if(localStorage.getItem('isLogged')){
    return true;
  } 
  else {
    router.navigate(['/login']);
    return false;
  }
}

