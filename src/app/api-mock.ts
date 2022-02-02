import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Todo } from './todo/todo.service';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const todo:Todo[] = [
      { id: '11', subject: 'Todo 111',createdAt: new Date(), updateAt: new Date(),done: true,doneAt: new Date()},
      { id: '22', subject: 'Todo 222',createdAt: new Date(), updateAt: new Date(),done: false,doneAt: new Date()},
      { id: '33', subject: 'Todo 3333',createdAt: new Date(), updateAt: new Date(),done: false,doneAt: new Date()},
      { id: '44', subject: 'Todo 4444',createdAt: new Date(), updateAt: new Date(),done: true,doneAt: new Date()},
    ];
    return {todo};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(list: Todo[]): string {
    return list.length > 0 ? list.map(list => list.id) + '1' : '111';
  }
}