import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TodoModel } from 'src/app/core/models/todo.model';
import { TodoDetailComponent } from '../todo-detail/todo-detail.component';
import { TodoStorageService } from 'src/app/core/services/todo-storage.service';
import { TodoStateEnum } from 'src/app/core/models/todo-state.enum';

@Component({
  selector: 'app-todo-list-ion-list',
  templateUrl: './todo-list-ion-list.component.html',
  styleUrls: ['./todo-list-ion-list.component.scss']
})
export class TodoListIonListComponent implements OnInit {

  @Input() title;
  @Input() todoList: TodoModel[];

  @Output() onItemArchiveEvent: EventEmitter<number> = new EventEmitter<number>();

  TodoStateEnum = TodoStateEnum;

  constructor(
    public modalController: ModalController,
    private todoStorageService: TodoStorageService
  ) { }

  ngOnInit(): void {
  }

  async onItemClick(todo: TodoModel) {
    await this.openTodoDetail(todo);
  }

  async openTodoDetail(todo: TodoModel = new TodoModel()) {
    const modal = await this.modalController.create({
      component: TodoDetailComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        todo
      }
    });
    return await modal.present();
  }

  onCheckboxChange(todo: TodoModel) {
    this.todoStorageService.updateTodo(todo);
  }
  onItemArchive(todo: TodoModel) {
    todo.state = TodoStateEnum.Archived;

    this.todoStorageService.updateTodo(todo);

    this.todoList = this.todoList.filter(c => c.id !== todo.id);

    this.onItemArchiveEvent.emit(todo.id);
  }
}
