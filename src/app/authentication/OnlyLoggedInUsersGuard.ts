import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';

@Injectable()
export class OnlyLoggedInUsersGuard implements CanActivate {
  constructor() {}

  canActivate() {
    return localStorage.getItem('token')!=null;
  }
}
