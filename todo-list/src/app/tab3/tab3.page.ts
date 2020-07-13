import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { TodoModel } from '../core/models/todo.model';
import { TodoStateEnum } from '../core/models/todo-state.enum';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  archiveTodos: TodoModel[] = [];

  constructor(private storage: Storage) {
    this.getOldArchive();
  }

  ionViewWillEnter() {
    this.getOldArchive();
  }

  getOldArchive() {
    this.storage.get('tasks').then((todoInDbString) => {
      const todos = JSON.parse(todoInDbString) as TodoModel[];

      this.archiveTodos = todos.filter(c => c.state !== TodoStateEnum.Valid).sort((a, b) => a.id - b.id);
    });
  }
}
