import { TodoStateEnum } from './todo-state.enum';

export class TodoModel {
    id: number;
    title: string;
    description: string;
    endDate: Date;
    endTime: Date;
    state: TodoStateEnum;
    checked: boolean;
}
