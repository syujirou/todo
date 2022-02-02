import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TodoDetailComponent } from '../todo-detail/todo-detail.component';
import { Todo, TodoService } from '../todo.service';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  list$ = this.todoService.list$;
  doneList$ = this.todoService.doneList$;

  isExpand:boolean = false;

  constructor(
    private todoService:TodoService,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
  }

  toggle(i:Todo){
    let _i = i.done = !i.done;
    this.todoService.update(i.id,_i);
  }

  refresh(){
    this.todoService.getList(false);
  }
  
  delete(i:Todo){
    this.todoService.delete(i.id);
  }

  detail(i:Todo){
    this,this.todoService.getItem(i.id);
    this.dialog.open(TodoDetailComponent);

    //this.todoService.update(i.id,_i);
  }

  expand(){
    this.isExpand = !this.isExpand;
  }

}
