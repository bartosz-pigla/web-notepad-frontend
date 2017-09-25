import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {passwordMatcher} from "../../customValidators/password-matcher";
import {Account} from "../../models/Account";
import {AccountService} from "../../services/AccountService";
import {Router} from "@angular/router";

@Component({
  templateUrl: 'signUp.component.html',
})

export class SignUpComponent implements OnInit{
  signUpForm:FormGroup;
  signedUp:Boolean;

  constructor(private formBuilder: FormBuilder, private accountService: AccountService, private router:Router){

  }

  ngOnInit(): void {
    this.signUpForm=this.formBuilder.group({
      login: ['',[Validators.required, Validators.maxLength(30)]],
      firstName:['',[Validators.maxLength(50)]],
      lastName:['',[Validators.maxLength(70)]],
      passwords: this.formBuilder.group({
        password: ['',[Validators.required, Validators.maxLength(50)]],
        reenterPassword: ['',[Validators.required, Validators.maxLength(50)]]
      }, { validator: passwordMatcher })
    });
  }

  signUp(){
    const component=this;

    this.accountService.postAccount(this.convertSignUpFormToAccount())
      .subscribe(
        data=>{
          console.log('SUCCESS '+data);
          component.signedUp=true;
          component.router.navigate(['/login'],{ queryParams: { signedUp: true } });
        },
        err=>{
          console.log('FAIL '+err);
          component.signedUp=false;
        }
      );
  }

  convertSignUpFormToAccount(){
    const passwords=this.signUpForm.controls.passwords;
    return new Account(
      0,
      this.signUpForm.controls.login.value,
      this.signUpForm.controls.firstName.value,
      this.signUpForm.controls.lastName.value,
      passwords.get('password').value
    );
  }
}
