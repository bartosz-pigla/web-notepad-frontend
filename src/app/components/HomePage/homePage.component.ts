import {Component, OnInit} from '@angular/core';
import {Note} from '../../models/Note';
import {ActivatedRoute, Router} from '@angular/router';
import {NoteService} from '../../services/NoteService';
import {Pagination} from '../../models/Pagination';

@Component({
  templateUrl: 'homePage.component.html'
})
export class HomePageComponent implements OnInit{
  currentPage:number;
  nextPageDisabled:boolean;
  notes:Note[];
  noteIdToDelete:number;
  deleted:Boolean;
  edited:Boolean;
  // accountHasNotNotes:Boolean;

  pageSize=10;

  constructor(private router:Router, private route:ActivatedRoute, private noteService:NoteService){
    console.log('home');
    this.nextPageDisabled=false;
    this.currentPage=1;
  }

  ngOnInit(): void {
    const component=this;

    this.route
    .queryParams
    .subscribe(params => {
      console.log('EDITED: '+JSON.stringify(params));
      if(params['edited']!==undefined && JSON.parse(params['edited'])===true){
        component.edited=true;
        console.log('EDITED: true');
      }
    });

    this.noteService.getNotes(JSON.parse(localStorage.getItem('account')).accountId,new Pagination(this.pageSize,1))
      .subscribe(
        notes=>{
          console.log('GET INITIAL NOTES: '+JSON.stringify(notes));
          component.notes=notes;
          if(component.notes.length===0){
            // component.accountHasNotNotes=true;
            component.nextPageDisabled=true;
          }
        },
        err=>{

        }
      );
  }

  // initNoteArray(){
  //   this.notes=[new Note(1,'1',null,'1',1),new Note(2,'2',null,'2',2),new Note(3,'3',null,'3',3)];
  // }

  editNote(note:Note){
    console.log('EDITING NOTE: '+note.noteId);
    localStorage.setItem('noteToEdit',JSON.stringify(note));
    this.router.navigate(['/editNote']);
  }

  markNoteToDelete(note:Note){
    console.log('DELETEING NOTE: '+note.noteId);
    this.noteIdToDelete=note.noteId;
  }

  deleteNote(){
    console.log('DELETEING NOTE FROM MODAL: '+this.noteIdToDelete);

    const component=this;

    this.noteService.deleteNote(this.noteIdToDelete)
      .subscribe(
        response=>{
          component.deleted=true;
          this.noteService.getNotes(JSON.parse(localStorage.getItem('account')).accountId,new Pagination(this.pageSize,this.currentPage))
            .subscribe(
              notes=>{
                component.notes=notes;
              },
              err=>{

              }
            );
        },
        err=>{
          component.deleted=false;
        }
      );
  }

  previousPage(){
    if(this.currentPage>1){
      this.currentPage--;

      console.log('current page '+this.currentPage);

      const component=this;

      this.noteService.getNotes(JSON.parse(localStorage.getItem('account')).accountId,new Pagination(this.pageSize,this.currentPage))
        .subscribe(
          notes=>{
            component.notes=notes;
            component.nextPageDisabled=false;
          },
          err=>{

          }
        );
    }
  }

  nextPage(){
    this.currentPage++;
    console.log('current page '+this.currentPage);

    const component=this;

    this.noteService.getNotes(JSON.parse(localStorage.getItem('account')).accountId,new Pagination(this.pageSize,this.currentPage))
      .subscribe(
        notes=>{
          console.log('NEXT PAGE CONTENT: '+JSON.stringify(notes));
          if(notes.length===0){
            component.currentPage--;
            component.nextPageDisabled=true;
          }
          else{
            component.notes=notes;
            component.nextPageDisabled=false;
          }
        },
        err=>{

        }
      );


  }
}
