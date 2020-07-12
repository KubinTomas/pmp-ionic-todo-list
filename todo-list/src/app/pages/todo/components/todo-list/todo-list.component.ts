import { Component, OnInit } from '@angular/core';
import { TodoDetailComponent } from '../todo-detail/todo-detail.component';
import { ModalController } from '@ionic/angular';
import { TodoModel } from 'src/app/core/models/todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit(): void {
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
}
