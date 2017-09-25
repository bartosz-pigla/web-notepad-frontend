export class Account{
  accountId:number;
  login:string;
  firstName:string;
  lastName:string;
  password:string;


  constructor(accountId: number, username: string, firstName: string, lastName: string, password: string) {
    this.accountId = accountId;
    this.login = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
  }
}
