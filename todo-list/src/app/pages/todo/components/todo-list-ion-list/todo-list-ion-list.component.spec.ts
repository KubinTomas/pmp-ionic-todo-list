import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListIonListComponent } from './todo-list-ion-list.component';

describe('TodoListIonListComponent', () => {
  let component: TodoListIonListComponent;
  let fixture: ComponentFixture<TodoListIonListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoListIonListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListIonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
