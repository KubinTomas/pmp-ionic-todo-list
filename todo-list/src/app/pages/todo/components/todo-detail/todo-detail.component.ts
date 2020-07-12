import { Component, OnInit, Input } from '@angular/core';
import { TodoModel } from 'src/app/core/models/todo.model';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss']
})
export class TodoDetailComponent implements OnInit {

  @Input() todo: TodoModel;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit(): void {
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
}
