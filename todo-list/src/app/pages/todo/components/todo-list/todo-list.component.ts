import { Component, OnInit } from '@angular/core';
import { TodoDetailComponent } from '../todo-detail/todo-detail.component';
import { ModalController, Platform } from '@ionic/angular';
import { TodoModel } from 'src/app/core/models/todo.model';
import { Storage } from '@ionic/storage';
import { ThrowStmt } from '@angular/compiler';
import { TodoStateEnum } from 'src/app/core/models/todo-state.enum';
import { TodoStorageService } from 'src/app/core/services/todo-storage.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {

  filterDate: Date = null;

  todoList: TodoModel[] = [];
  todoListData: TodoModel[] = [];

  todayTodoList: TodoModel[] = [];
  tomorrowTodoList: TodoModel[] = [];
  nextTodoList: TodoModel[] = [];

  // null  - all
  // true  - checked
  // false - not checked
  showChecked: boolean = null;

  constructor(
    public modalController: ModalController,
    private storage: Storage,
    private todoStorage: TodoStorageService) {
    this.getTodoList();
  }


  getTodoList() {
    this.storage.get('tasks').then((todoInDbString) => {
      if (!todoInDbString) {
        this.todoList = [];
      } else {
        const todos = JSON.parse(todoInDbString) as TodoModel[];

        todos.forEach(t => {
          t.endDate = new Date(t.endDate);
        });

        this.todoList = todos.filter(c => c.state === TodoStateEnum.Valid).sort((a, b) => a.id - b.id);

        this.checkOrSetInvalidTodos();

        this.todoListData = [...this.todoList];

        this.filterData();
      }
    });
  }

  checkOrSetInvalidTodos() {
    const today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0, 0);

    const oldTodos = this.todoList.filter(c => c.state === TodoStateEnum.Valid && c.endDate.getTime() <= today.getTime());

    this.todoStorage.setExpiredTodos(oldTodos);

    this.todoList = this.todoList.filter(c => c.state === TodoStateEnum.Valid && !(c.endDate.getTime() <= today.getTime()));
  }

  getTodoListViewData() {
    this.getTodoListToday(this.todoList);
    this.getTodoListTomorrow(this.todoList);
    this.getTodoListNext(this.todoList);
  }
  getTodoListToday(todoList: TodoModel[]) {
    const today = new Date().toDateString();

    this.todayTodoList = todoList.filter(c => c.endDate.toDateString() === today);
  }

  getTodoListTomorrow(todoList: TodoModel[]) {
    const tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toDateString();

    this.tomorrowTodoList = todoList.filter(c => c.endDate.toDateString() === tomorrow);
  }

  getTodoListNext(todoList: TodoModel[]) {
    const today = new Date().toDateString();
    const tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toDateString();

    this.nextTodoList = todoList.filter(c => c.endDate.toDateString() !== tomorrow && c.endDate.toDateString() !== today);
  }

  async onItemClick() {
    await this.openTodoDetail();
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

  removeFilters() {
    this.filterDate = null;
  }


  onFilterDateChange(event) {
    this.filterData();
  }

  onShowCheckedChange(showChecked: boolean) {
    this.showChecked = showChecked;

    this.filterData();
  }

  onFilterDateCancel() {
    this.filterDate = null;

    this.filterData();
  }

  filterData() {
    this.todoList = [...this.todoListData];

    if (this.showChecked !== null) {
      console.log(this.showChecked);
      this.todoList = this.todoList.filter(c => c.checked === this.showChecked);
    }

    if (this.filterDate) {
      this.todoList = this.todoList.filter(c => c.endDate.toDateString() === new Date(this.filterDate).toDateString());
    }

    this.getTodoListViewData();
  }

  onItemArchive(itemId: number) {
    this.todoList = this.todoList.filter(c => c.id !== itemId);
    this.todoListData = this.todoListData.filter(c => c.id !== itemId);
  }
}
