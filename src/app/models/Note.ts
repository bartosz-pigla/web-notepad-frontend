export class Note{
  noteId:number;
  title:string;
  creationTime:Date;
  content:string;
  accountId:number;


  constructor(noteId: number, title: string, creationTime: Date, content: string, accountId: number) {
    this.noteId = noteId;
    this.title = title;
    this.creationTime = creationTime;
    this.content = content;
    this.accountId = accountId;
  }

  //
  // constructor(noteId: number) {
  //   this.noteId = noteId;
  // }
}
