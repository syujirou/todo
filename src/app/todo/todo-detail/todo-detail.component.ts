import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Todo, TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss']
})
export class TodoDetailComponent implements OnInit {

  item$ = this.todoService.item$;
  value:string="";

  constructor(
    private todoService : TodoService,
    private dialog:MatDialog
    ) { }

  ngOnInit(): void {
  }

  cancel(){
    this.dialog.closeAll();
  }

  ok(){
    let _ = new Todo();

    this.todoService.update("",_);
    this.dialog.closeAll();
  }

}
