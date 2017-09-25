import {Component, Injectable, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {passwordMatcher} from '../../customValidators/password-matcher';
import {Account} from '../../models/Account';
import {AccountService} from "../../services/AccountService";

@Component({
  templateUrl: 'editAccount.component.html',
})

export class EditAccountComponent implements OnInit{
  editAccountForm:FormGroup;
  account:Account;
  edited:Boolean;

  constructor(private formBuilder: FormBuilder, private accountService: AccountService){

  }

  ngOnInit(): void {
    this.account=JSON.parse(localStorage.getItem('account'));

    this.editAccountForm=this.formBuilder.group({
      login: [this.account.login,[Validators.required, Validators.maxLength(30)]],
      firstName:[this.account.firstName,[Validators.required, Validators.maxLength(50)]],
      lastName:[this.account.lastName,[Validators.required,Validators.maxLength(70)]],
      passwords: this.formBuilder.group({
        password: [this.account.password,[Validators.required, Validators.maxLength(50)]],
        reenterPassword: [this.account.password,[Validators.required, Validators.maxLength(50)]]
      }, { validator: passwordMatcher })
    });
  }

  editAccount(){
    const accountToUpdate=this.convertSignUpFormToAccount();

    console.log(JSON.stringify(accountToUpdate));

    const component=this;

    this.accountService.putAccount(this.convertSignUpFormToAccount())
      .subscribe(
        data=>{
          console.log('SUCCESS '+data);
          localStorage.setItem('account', JSON.stringify(accountToUpdate));
          component.edited=true;
        },
        err=>{
          console.log('FAIL '+err);
          component.edited=false;
        }
      );
  }

  convertSignUpFormToAccount(){
    const passwords=this.editAccountForm.controls.passwords;
    return new Account(
      this.account.accountId,
      this.editAccountForm.controls.login.value,
      this.editAccountForm.controls.firstName.value,
      this.editAccountForm.controls.lastName.value,
      passwords.get('password').value
    );
  }
}
