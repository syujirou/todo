import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, firstValueFrom } from "rxjs";
import { StoreService } from "./store.service";

@Injectable({
  providedIn: "root",
})
export class TodoService {

  public url = 'api/todo';

  constructor(
    private http: HttpClient,
    private store:StoreService
    ) {}

  get item$() {
    return this.store.select(state => state.item);
  }

  get list$() {
    return this.store.select(state => state.list);
  }

  get doneList$() {
    return this.store.select(state => state.doneList);
  }

  getItem(id:string){
    let _url = `${this.url}/${id}`;

    this.http.get<Todo>(_url).pipe(map((resp) => resp)).subscribe(r =>
      {
        this.store.selected(r);
      });
  }

  getList(withDone:boolean) {
    let _url = this.url;
    if(withDone){
      _url = `${_url}/with_done`
    }
    
    this.http.get<Todo[]>(this.url).pipe(map((resp) => resp)).subscribe(r =>
      {
        this.store.list(r);
      });
  }

  sort(sort:Sort){

    this.list$.subscribe(r =>
      {
        let list : Todo[] = this.sortToList(sort,r);
        this.store.sort(sort,list);
      });
  }

  push(body:any){
    this.http.post<Todo>(this.url,body).pipe(map((resp) => resp));
  }

  update(id:string,body:any){

    let _url = `${this.url}/${id}`;
    
    this.http.put<Todo>(_url,body).pipe(map((resp) => resp));
    
  }

  delete(id:string){
    let _url = `${this.url}/${id}`;
    
    this.http.delete<Todo>(_url).pipe(map((resp) => resp));
  }

  sortToList(sort:Sort,list:Todo[]):Todo[]{
    if(sort.subject){
        list.sort((n1,n2) => {
          if (n1.subject > n2.subject) {
              return 1;
          }
      
          if (n1.subject < n2.subject) {
              return -1;
          }
      
          return 0;
      });
    }

    if(sort.createdAt){
      list.sort((n1,n2) => {
        if (n1.createdAt > n2.createdAt) {
            return 1;
        }
    
        if (n1.createdAt < n2.createdAt) {
            return -1;
        }
    
        return 0;
      });
    }

    if(sort.updateAt){
      list.sort((n1,n2) => {
        if (n1.updateAt > n2.updateAt) {
            return 1;
        }
    
        if (n1.updateAt < n2.updateAt) {
            return -1;
        }
    
        return 0;
      });
    }

    return list;

  }
}

export class Todo {
  id: string;
  subject: string;
  createdAt: Date;
  updateAt: Date;
  done: boolean;
  doneAt: Date;

  constructor(){
    this.id = '';
    this.subject = '';
    this.createdAt = new Date();
    this.updateAt = new Date();
    this.done = false;
    this.doneAt = new Date();
  }
}

export class Sort{
  subject:boolean;
  createdAt:boolean;
  updateAt:boolean;
  constructor(){
    this.subject = false;
    this.createdAt = false;
    this.updateAt = false;
  }

  
}
