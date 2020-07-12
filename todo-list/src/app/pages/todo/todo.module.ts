import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoDetailComponent } from './components/todo-detail/todo-detail.component';
import { TodoListIonListComponent } from './components/todo-list-ion-list/todo-list-ion-list.component';


@NgModule({
  declarations: [AddTodoComponent, TodoListComponent, TodoDetailComponent, TodoListIonListComponent],
  imports: [
    CommonModule,
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [AddTodoComponent, TodoListComponent]
})
export class TodoModule { }
