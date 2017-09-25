import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {serverBaseUrl} from '../serverInfo';
import {Note} from '../models/Note';
import {Pagination} from "../models/Pagination";


@Injectable()
export class NoteService {
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

  postNote(note:Note){
    console.log('NOTE TO POST: '+JSON.stringify(note));

    return this.http.post(serverBaseUrl+'api/note',{'noteId':0,'title':note.title,'content':note.content,'accountId':note.accountId},
      {
        headers:this.getHeader(),
        responseType: 'text'}
    );
  }

  putNote(note:Note){
    return this.http.put(serverBaseUrl+'api/note',
      {'noteId':note.noteId,'title':note.title,'content':note.content,'accountId':note.accountId},
      {
        headers:this.getHeader(),
        responseType: 'text'}
    );
  }

  getNotes(accountId:number,page:Pagination):Observable<Note[]>{
    return this.http.get(serverBaseUrl+'api/note/'+accountId+'?size='+page.size+'&number='+page.number, {headers:this.getHeader()});
  }

  deleteNote(noteId:number){
    return this.http.delete(serverBaseUrl+'api/note/'+noteId,{
      headers:this.getHeader(),
      responseType: 'text'
    }
    );
  }
}
