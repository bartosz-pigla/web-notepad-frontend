import {Component, Injectable, Input, OnInit} from '@angular/core';
import {AuthenticationService} from '../../authentication/AuthenticationService';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Note} from '../../models/Note';
import {Account} from '../../models/Account';
import {NoteService} from "../../services/NoteService";

@Component({
  templateUrl: 'addNote.component.html',
})

export class AddNoteComponent implements OnInit{
  addNoteForm:FormGroup;
  added:Boolean;

  constructor(private formBuilder: FormBuilder, private noteService:NoteService){

  }

  ngOnInit(): void {
    this.addNoteForm=this.formBuilder.group({
      title: ['',[Validators.required, Validators.maxLength(30)]],
      description:['',[Validators.maxLength(255)]]
    });
  }

  addNote(){
    const note=this.convertSignUpFormToNote();
    console.log(JSON.stringify(note));

    const component=this;

    this.noteService.postNote(this.convertSignUpFormToNote())
      .subscribe(
        data=>{
          console.log('SUCCESS '+data);
          component.added=true;
          component.addNoteForm.reset();
        },
        err=>{
          console.log('FAIL '+err);
          component.added=false;
        }
      );
  }

  convertSignUpFormToNote(){
    const loggedIn=JSON.parse(localStorage.getItem('account'));

    return new Note(
      0,
      this.addNoteForm.controls.title.value,
      new Date(),
      this.addNoteForm.controls.description.value,
      loggedIn.accountId
    );
  }
}
