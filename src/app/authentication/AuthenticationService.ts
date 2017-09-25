import {AccountCredentials} from '../models/AccountCredentials';
import {Account} from '../models/Account';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {serverBaseUrl} from '../serverInfo';
import {Injectable} from '@angular/core';
import {AccountService} from '../services/AccountService';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient, private accountService:AccountService) {
  }

  signOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('account');
  }

  signIn(accountCredentials: AccountCredentials){
    return new Promise((resolve, reject) => {
      console.log('SIGN IN');

      const req = this.http.post(serverBaseUrl + 'token', accountCredentials,{
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
        responseType: 'text'
      })
        .subscribe(
          token => {
            console.log('TOKEN '+token);
            localStorage.setItem('token', JSON.stringify(token));

            this.accountService.getAccountByLogin(accountCredentials.login)
              .subscribe(accountString => {
                  console.log('CURRENT ACCOUNT '+accountString);
                  localStorage.setItem('account', JSON.stringify(accountString));
                  resolve(true);
                },
                err => {
                  console.log('GET CURRENT ACCOUNT ERROR');
                  reject(false);
                });

          },
          err => {
            console.log('GET TOKEN ERROR: '+JSON.stringify(err));
            reject(false);
          }
        );
    });
  }
}
