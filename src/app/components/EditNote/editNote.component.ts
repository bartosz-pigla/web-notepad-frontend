import {Component, Injectable, Input, OnInit} from '@angular/core';
import {AuthenticationService} from '../../authentication/AuthenticationService';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Note} from "../../models/Note";
import {NoteService} from "../../services/NoteService";

@Component({
  templateUrl: 'editNote.component.html',
})

export class EditNoteComponent implements OnInit{
  editNoteForm:FormGroup;
  note:Note;
  edited:Boolean;

  constructor(private formBuilder: FormBuilder,private router: Router, private noteService:NoteService){

  }

  ngOnInit(): void {
    // this.route.params.subscribe(params => {
    //   const noteId = params['noteId'];
    //   console.log('EDIT NOTE: ID '+noteId);
    // });
    this.note=JSON.parse(localStorage.getItem('noteToEdit'));
    localStorage.removeItem('noteToEdit');

    console.log('EDIT PAGE: '+JSON.stringify(this.note));

    this.editNoteForm=this.formBuilder.group({
      title: [this.note.title,[Validators.required, Validators.maxLength(30)]],
      description:[this.note.content,[Validators.maxLength(255)]]
    });
  }

  editNote(){
    const noteToUpdate=this.convertSignUpFormToNote();
    console.log(JSON.stringify(noteToUpdate));

    const component=this;

    this.noteService.putNote(this.convertSignUpFormToNote())
      .subscribe(
        data=>{
          console.log('SUCCESS '+data);
          component.edited=true;

          component.router.navigate(['/home'],{ queryParams: { edited: true } });
        },
        err=>{
          console.log('FAIL '+err);
          component.edited=false;
        }
      );
  }

  convertSignUpFormToNote(){
    return new Note(
      this.note.noteId,
      this.editNoteForm.controls.title.value,
      this.note.creationTime,
      this.editNoteForm.controls.description.value,
      this.note.accountId
    );
  }
}
