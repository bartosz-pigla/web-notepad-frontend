import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {LoginComponent} from './components/Login/login.component';
import {HomePageComponent} from './components/HomePage/homePage.component';
import {HeaderComponent} from './components/Header/header.component';

import {RouterModule, Routes} from '@angular/router';
import {AlwaysAuthGuard} from './authentication/AlwaysAuthGuard';
import {OnlyLoggedInUsersGuard} from './authentication/OnlyLoggedInUsersGuard';
import {HttpClientModule} from '@angular/common/http';
import {AuthenticationService} from './authentication/AuthenticationService';
import {AddNoteComponent} from './components/AddNote/addNote.component';
import {EditNoteComponent} from './components/EditNote/editNote.component';
import {EditAccountComponent} from './components/EditAccount/editAccount.component';
import {SignUpComponent} from './components/signUp/signUp.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AccountService} from './services/AccountService';
import {Http} from '@angular/http';
import {NoteService} from './services/NoteService';
import {NgHttpLoaderModule} from 'ng-http-loader/ng-http-loader.module';

export const ROUTES: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [AlwaysAuthGuard] },
  { path: 'signUp', component: SignUpComponent, canActivate: [AlwaysAuthGuard] },
  { path: 'home', component: HomePageComponent, canActivate: [OnlyLoggedInUsersGuard]},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'addNote', component: AddNoteComponent, canActivate: [OnlyLoggedInUsersGuard]},
  { path: 'editNote', component: EditNoteComponent, canActivate: [OnlyLoggedInUsersGuard]},
  { path: 'editAccount', component: EditAccountComponent, canActivate: [OnlyLoggedInUsersGuard]}
];



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomePageComponent,
    SignUpComponent,
    AddNoteComponent,
    EditNoteComponent,
    EditAccountComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    RouterModule.forRoot(ROUTES),
    HttpClientModule,
    ReactiveFormsModule,
    NgHttpLoaderModule
  ],
  providers: [
    AlwaysAuthGuard,
    OnlyLoggedInUsersGuard,
    AuthenticationService,
    HeaderComponent,
    AccountService,
    NoteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
