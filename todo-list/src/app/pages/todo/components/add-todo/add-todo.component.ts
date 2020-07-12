import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ToastController } from '@ionic/angular';
import { ToastService } from 'src/app/core/services/toast.service';
import { TodoModel } from 'src/app/core/models/todo.model';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent {

  todoForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastService
  ) {
    this.buildForm();
  }

  buildForm() {
    this.todoForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      endDate: [new Date().toISOString()],
      endTime: [new Date().toISOString()],
    });
  }
  async onSubmit() {
    if (this.todoForm.invalid) {
      await this.toastService.presentToast('Formulář je neplatný, nedošlo k uložení');
      return;
    }
    console.log(this.todoForm.value);
    this.addTask(this.todoForm.value);
  }

  async addTask(task: TodoModel) {
    await this.toastService.presentToast('Úkol vytvořen');

    this.buildForm();
  }
}
