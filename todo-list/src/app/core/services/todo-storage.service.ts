import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { TodoModel } from '../models/todo.model';
import { TodoStateEnum } from '../models/todo-state.enum';

@Injectable({
  providedIn: 'root'
})
export class TodoStorageService {

  constructor(private storage: Storage) { }

  updateTodo(todo: TodoModel) {
    this.storage.get('tasks').then((todoInDbString) => {
      const todos = JSON.parse(todoInDbString) as TodoModel[];

      const newTodos = todos.filter(c => c.id !== todo.id);
      newTodos.push(todo);

      this.storage.set('tasks', JSON.stringify(newTodos));
    });
  }

  getTodoId() {
    return this.storage.get('todoId');
  }

  saveNewTodoId(todoId: number) {
    return this.storage.set('todoId', todoId);
  }

  cleanTodo() {
    this.storage.set('tasks', JSON.stringify([]));
    this.storage.set('todoId', 0);
  }

  setExpiredTodos(oldTodos: TodoModel[]) {
    this.storage.get('tasks').then((todoInDbString) => {
      const todos = JSON.parse(todoInDbString) as TodoModel[];

      oldTodos.forEach(oldTodo => {
        const todoInDb = todos.find(c => c.id === oldTodo.id);
        todoInDb.state = TodoStateEnum.Expired;
      });

      this.storage.set('tasks', JSON.stringify(todos));
    });
  }
}
