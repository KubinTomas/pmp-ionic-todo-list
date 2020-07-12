import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TodoModel } from 'src/app/core/models/todo.model';
import { TodoDetailComponent } from '../todo-detail/todo-detail.component';

@Component({
  selector: 'app-todo-list-ion-list',
  templateUrl: './todo-list-ion-list.component.html',
  styleUrls: ['./todo-list-ion-list.component.scss']
})
export class TodoListIonListComponent implements OnInit {

  @Input() title;

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