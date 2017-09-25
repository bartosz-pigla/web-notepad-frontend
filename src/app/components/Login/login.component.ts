import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../authentication/AuthenticationService';
import {AccountCredentials} from '../../models/AccountCredentials';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HeaderComponent} from '../Header/header.component';

@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  // loginForm=new FormGroup({
  //   login:new FormControl(),
  //   password:new FormControl()
  // });
  loginForm: FormGroup;
  signedUp:boolean;
  loginSuccess: Boolean;

  constructor(private authenticationService: AuthenticationService, private route:ActivatedRoute ,private router: Router, private fb: FormBuilder, private header: HeaderComponent) {
    console.log('login');

    this.loginForm = fb.group({
      'login': [''],
      'password': ['']
    });

  }

  ngOnInit(): void {
    const component=this;

    this.route
      .queryParams
      .subscribe(params => {
        console.log('SIGNED UP: '+JSON.stringify(params));
        if(params['signedUp']!==undefined && JSON.parse(params['signedUp'])===true){
          component.signedUp=true;
          console.log('SIGNED Up: true');
        }
      });
  }

  login() {
    const credentials = this.loginForm.value;

    const loginComponent = this;

    this.authenticationService.signIn(credentials)
      .then(
      function (val) {
        loginComponent.header.updateCurrentlySignedIn();
        loginComponent.router.navigate(['/home']);
      })
      .catch(error => {
        loginComponent.loginSuccess = false;
    });
  }
}
