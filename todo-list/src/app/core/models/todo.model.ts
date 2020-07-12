import { TodoStateEnum } from './todo-state.enum';

export class TodoModel {
    title: string;
    description: string;
    endDate: Date;
    endTime: Date;
    state: TodoStateEnum;
}
