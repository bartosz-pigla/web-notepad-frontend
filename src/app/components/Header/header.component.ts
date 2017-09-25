import {Component, Injectable, Input} from '@angular/core';
import {AuthenticationService} from '../../authentication/AuthenticationService';
import {Router} from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
})

@Injectable()
export class HeaderComponent {
  @Input() loginPage: Boolean;
  @Input() activeTab: string;
  login:string;

  constructor(private authenticationService:AuthenticationService,private router: Router){
    console.log('header constructor');

    const account=localStorage.getItem('account');

    if(account!==undefined && account!=null){
      console.log('current account: '+account);

      this.login=JSON.parse(account).login;
      console.log('CURRENTLY SIGNED IN IN HEADER: '+this.login);
    }


  }

  signOut(){
    console.log('Login page '+this.loginPage);
    this.authenticationService.signOut();
    //this.router.navigate(['/login']);
  }

  updateCurrentlySignedIn(){
    console.log('CURRENTLY SIGNED IN IN HEADER: '+JSON.parse(localStorage.getItem('account')).login);
  }
  //TO DO: create field: currentAccount
}
