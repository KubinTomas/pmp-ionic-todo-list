import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ToastController } from '@ionic/angular';
import { ToastService } from 'src/app/core/services/toast.service';
import { TodoModel } from 'src/app/core/models/todo.model';
import { Storage } from '@ionic/storage';
import { TodoStateEnum } from 'src/app/core/models/todo-state.enum';
import { TodoStorageService } from 'src/app/core/services/todo-storage.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent {

  todoForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private storage: Storage,
    private todoStorageService: TodoStorageService
  ) {
   // this.todoStorageService.cleanTodo();
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

    this.addTodo(this.todoForm.value);
  }

  async addTodo(task: TodoModel) {
    task.state = this.getTodoState(task);
    this.todoStorageService.getTodoId().then(todoId => {
      if (!todoId) {
        todoId = 1;
      } else {
        todoId++;
      }
      task.id = todoId;
      task.checked = false;
      this.storage.get('tasks').then((todoInDbString) => {
        if (!todoInDbString) {
          const todos: TodoModel[] = [task];

          this.storage.set('tasks', JSON.stringify(todos));
        } else {
          const todos = JSON.parse(todoInDbString) as TodoModel[];
          todos.push(task);

          this.storage.set('tasks', JSON.stringify(todos));
          this.todoStorageService.saveNewTodoId(todoId);
        }

        this.toastService.presentToast('Úkol vytvořen');
      });

      this.buildForm();
    });

  }

  getTodoState(todo: TodoModel){
    const today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0, 0);

    return new Date(todo.endDate).getTime() <= today.getTime() ? TodoStateEnum.Expired : TodoStateEnum.Valid;
  }
}
