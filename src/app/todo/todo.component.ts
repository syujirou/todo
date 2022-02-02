import { Component, OnInit } from '@angular/core';
import { Sort, TodoService } from './todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  constructor(private todoService:TodoService) { }

  ngOnInit(): void {
    this.todoService.getList(true);

    let sort = new Sort();
    this.todoService.sort(sort);
  }

}
