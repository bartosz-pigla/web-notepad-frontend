import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {serverBaseUrl} from '../serverInfo';


@Injectable()
export class AccountService {
  constructor(private http: HttpClient) {
  }

  getToken(){
    return JSON.parse(localStorage.getItem('token'));
  }

  getHeader(){
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')
      .set('Authorization','Bearer '+this.getToken())
      .set('Access-Control-Allow-Origin','*');
      // .set()

    console.log('HEADERS: '+JSON.stringify(headers.get('Authorization')));

    console.log('getAccountByLogin '+this.getToken());

    return headers;
  }

  getAccountByLogin(login:string):Observable<Account>{
    return this.http.get(serverBaseUrl+'api/account/'+login, {headers:this.getHeader()});
  }

  postAccount(account:Account){
    return this.http.post(serverBaseUrl+'api/account',account,
      {
        headers:new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Access-Control-Allow-Origin','*'),
        responseType: 'text'}
    );
  }

  putAccount(account:Account){
    return this.http.put(serverBaseUrl+'api/account',account,
      {
        headers:this.getHeader(),
        responseType: 'text'}
    );
  }
}
