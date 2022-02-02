import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';

@Component({
  selector: 'todo-toolbar',
  templateUrl: './todo-toolbar.component.html',
  styleUrls: ['./todo-toolbar.component.scss']
})
export class TodoToolbarComponent implements OnInit {

  constructor(private todoService:TodoService) { }
  sort:string[] = ['0 0 40px','0 0 325px'];
  search:string[] = ['0 0 40px','0 0 220px'];

  searchFlex : string='0 0 40px';
  sortFlex : string='0 0 40px';

  value:string = '';

  ngOnInit(): void {
  }

  toggleSearch(){
    let _ = this.searchFlex;
    this.clear();
    this.searchFlex = _ == this.search[0] ? this.search[1]:this.search[0];
  }

  toggleSort(){
    let _ = this.sortFlex;
    this.clear();
    this.sortFlex = _ == this.sort[0] ? this.sort[1]:this.sort[0];
  }

  refresh(){
    this.clear();
    this.todoService.getList(true);
  }

  add(){
    this.todoService.push(this.value);
  }

  private clear(){
    this.searchFlex = this.search[0];
    this.sortFlex = this.sort[0];
  }

}
