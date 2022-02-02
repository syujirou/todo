import { Injectable } from "@angular/core";
import { BehaviorSubject, queueScheduler } from "rxjs";
import { map, distinctUntilChanged } from "rxjs/operators";
import { Sort, Todo } from "./todo.service";

@Injectable({ providedIn: "root" })
export class StoreService {

  private _state$ = new BehaviorSubject<State>(initialState);

  list(list:Todo[]) {
    const current = this._state$.value;
    current.list = list.filter(r => !r.done);
    current.doneList = list.filter(r => r.done);
    this.stateUpdate(current);
  }

  selected(item:Todo){
    const current = this._state$.value;
    current.item = item;
    this.stateUpdate(current);
  }

  sort(sort:Sort,list:Todo[]){
    const current = this._state$.value;
    current.sort = sort;
    current.list = list;
    this.stateUpdate(current);
  }

  push(item:Todo){
    const current = this._state$.value;
    current.list.push(item);

    this.stateUpdate(current);
  }

  update(item:Todo){
    const current = this._state$.value;
    let _list = current.list;
    _list.filter(r => r.id === item.id)[0] == item;

    current.list = _list;

    this.stateUpdate(current);
  }

  delete(id:string){
    const current = this._state$.value;
    current.list = current.list.filter(r => r.id != id);

    this.stateUpdate(current);
  }

  stateUpdate(state:State){
    queueScheduler.schedule(() => {
      this._state$.next(state);
    });
  }

  select<T>(selector: (state: State) => T) {
    return this._state$.pipe(map(selector), distinctUntilChanged());
  }
}

export enum ViewType {
  List,
  Grid,
}

export interface State {
  list: Todo[];
  item:Todo | null;
  doneList:Todo[];
  viewType: ViewType;
  withDone: boolean;
  sort:Sort | null;
}

export const initialState = {
  list: [],
  item: null,
  doneList:[],
  viewType: ViewType.List,
  withDone: true,
  sort : null
};
